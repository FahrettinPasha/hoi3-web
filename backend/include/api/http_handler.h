#pragma once

#include <string>
#include <functional>
#include <unordered_map>

namespace hoi3 {

class GameState;

class HttpHandler {
public:
    HttpHandler();
    ~HttpHandler();
    
    void start(int port);
    void stop();
    
    void set_game_state(GameState* game_state);
    
private:
    bool running_;
    GameState* game_state_;
    std::unordered_map<std::string, std::function<std::string()>> routes_;
    
    std::string handle_request(const std::string& path);
    std::string get_nations();
    std::string get_provinces();
    std::string get_divisions();
    std::string advance_day();
};

} // namespace hoi3
