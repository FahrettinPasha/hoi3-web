#include "api/game_server.h"
#include <iostream>
#include <thread>
#include <chrono>

namespace hoi3 {

GameServer::GameServer(GameState* game_state)
    : game_state_(game_state), server_fd_(-1), running_(false) {
}

GameServer::~GameServer() {
    stop();
}

void GameServer::start(int port) {
    std::cout << "GameServer starting on port " << port << std::endl;
    running_ = true;
    
    // TODO: Implement WebSocket server
    // For now, just run in a loop
    while (running_) {
        std::this_thread::sleep_for(std::chrono::seconds(1));
        
        // Simulate game loop
        game_state_->advance_day();
    }
}

void GameServer::stop() {
    running_ = false;
    std::cout << "GameServer stopped" << std::endl;
}

} // namespace hoi3
