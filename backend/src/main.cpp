#include <iostream>
#include <memory>
#include "game_state.h"
#include "api/http_handler.h"

int main() {
    std::cout << "HOI3 Backend - C++ Game Engine" << std::endl;
    std::cout << "Starting HTTP API server on port 8888..." << std::endl;
    
    auto game_state = std::make_unique<hoi3::GameState>();
    game_state->load_scenario("1939");
    
    auto http_server = std::make_unique<hoi3::HttpHandler>();
    http_server->set_game_state(game_state.get());
    http_server->start(8888);
    
    return 0;
}
