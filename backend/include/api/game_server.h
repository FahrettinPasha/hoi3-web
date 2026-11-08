#pragma once

#include "game_state.h"
#include <memory>

namespace hoi3 {

class GameServer {
public:
    explicit GameServer(GameState* game_state);
    ~GameServer();
    
    void start(int port);
    void stop();
    
private:
    GameState* game_state_;
    int server_fd_;
    bool running_;
};

} // namespace hoi3
