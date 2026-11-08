#include "api/http_handler.h"
#include "game_state.h"
#include <iostream>
#include <thread>
#include <chrono>
#include <cstring>
#include <sstream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

namespace hoi3 {

HttpHandler::HttpHandler() : running_(false), game_state_(nullptr) {}

HttpHandler::~HttpHandler() {
    stop();
}

void HttpHandler::set_game_state(GameState* game_state) {
    game_state_ = game_state;
}

void HttpHandler::start(int port) {
    if (!game_state_) {
        std::cerr << "Game state not set" << std::endl;
        return;
    }
    
    running_ = true;
    
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0) {
        std::cerr << "Failed to create socket" << std::endl;
        return;
    }
    
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    
    struct sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(port);
    
    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        std::cerr << "Failed to bind" << std::endl;
        close(server_fd);
        return;
    }
    
    listen(server_fd, 3);
    std::cout << "HTTP server listening on port " << port << std::endl;
    
    while (running_) {
        struct sockaddr_in client_addr;
        socklen_t addr_len = sizeof(client_addr);
        
        int client_fd = accept(server_fd, (struct sockaddr*)&client_addr, &addr_len);
        if (client_fd < 0) {
            if (running_) {
                std::cerr << "Failed to accept connection" << std::endl;
            }
            continue;
        }
        
        char buffer[4096] = {0};
        read(client_fd, buffer, 4095);
        
        // Parse request path
        std::string request(buffer);
        std::string path = "/";
        
        size_t get_pos = request.find("GET ");
        if (get_pos != std::string::npos) {
            size_t http_pos = request.find(" HTTP", get_pos);
            if (http_pos != std::string::npos) {
                path = request.substr(get_pos + 4, http_pos - get_pos - 4);
            }
        }
        
        std::string response = handle_request(path);
        
        const char* response_str = response.c_str();
        send(client_fd, response_str, strlen(response_str), 0);
        close(client_fd);
    }
    
    close(server_fd);
}

void HttpHandler::stop() {
    running_ = false;
}

std::string HttpHandler::handle_request(const std::string& path) {
    std::ostringstream response;
    
    response << "HTTP/1.1 200 OK\r\n";
    response << "Content-Type: application/json\r\n";
    response << "Access-Control-Allow-Origin: *\r\n";
    response << "\r\n";
    
    if (path == "/api/nations") {
        response << get_nations();
    } else if (path == "/api/provinces") {
        response << get_provinces();
    } else if (path == "/api/divisions") {
        response << get_divisions();
    } else if (path == "/api/advance-day") {
        game_state_->advance_day();
        response << "{\"status\":\"ok\"}";
    } else {
        response << "{\"status\":\"ok\",\"message\":\"HOI3 Backend API\"}";
    }
    
    return response.str();
}

std::string HttpHandler::get_nations() {
    auto nations = game_state_->get_nations();
    
    std::ostringstream json;
    json << "[";
    
    for (size_t i = 0; i < nations.size(); i++) {
        if (i > 0) json << ",";
        json << "{";
        json << "\"id\":\"" << nations[i].id << "\",";
        json << "\"name\":\"" << nations[i].name << "\",";
        json << "\"color\":[" << nations[i].color[0] << "," << nations[i].color[1] << "," << nations[i].color[2] << "],";
        json << "\"money\":" << nations[i].money << ",";
        json << "\"politicalPower\":" << nations[i].political_power << ",";
        json << "\"stability\":" << nations[i].stability << ",";
        json << "\"warSupport\":" << nations[i].war_support;
        json << "}";
    }
    
    json << "]";
    return json.str();
}

std::string HttpHandler::get_provinces() {
    auto provinces = game_state_->get_provinces();
    
    std::ostringstream json;
    json << "[";
    
    for (size_t i = 0; i < provinces.size(); i++) {
        if (i > 0) json << ",";
        json << "{";
        json << "\"id\":" << provinces[i].id << ",";
        json << "\"name\":\"" << provinces[i].name << "\",";
        json << "\"owner\":\"" << provinces[i].owner << "\",";
        json << "\"terrain\":\"" << provinces[i].terrain << "\",";
        json << "\"infrastructure\":" << provinces[i].infrastructure;
        json << "}";
    }
    
    json << "]";
    return json.str();
}

std::string HttpHandler::get_divisions() {
    auto divisions = game_state_->get_divisions();
    
    std::ostringstream json;
    json << "[";
    
    for (size_t i = 0; i < divisions.size(); i++) {
        if (i > 0) json << ",";
        json << "{";
        json << "\"id\":\"" << divisions[i].id << "\",";
        json << "\"name\":\"" << divisions[i].name << "\",";
        json << "\"templateId\":\"" << divisions[i].template_id << "\",";
        json << "\"strength\":" << divisions[i].strength << ",";
        json << "\"organization\":" << divisions[i].organization << ",";
        json << "\"provinceId\":" << divisions[i].province_id;
        json << "}";
    }
    
    json << "]";
    return json.str();
}

std::string HttpHandler::advance_day() {
    game_state_->advance_day();
    return "{\"status\":\"ok\"}";
}

} // namespace hoi3
