#pragma once

#include <string>
#include <vector>
#include <unordered_map>
#include <memory>

namespace hoi3 {

struct Nation {
    std::string id;
    std::string name;
    int color[3];
    double money;
    double political_power;
    double stability;
    double war_support;
};

struct Province {
    int id;
    std::string name;
    std::string owner;
    std::string terrain;
    int infrastructure;
};

struct Division {
    std::string id;
    std::string name;
    std::string template_id;
    double strength;
    double organization;
    int province_id;
};

class GameState {
public:
    GameState();
    
    void load_scenario(const std::string& scenario_id);
    void advance_day();
    
    std::vector<Nation> get_nations() const;
    std::vector<Province> get_provinces() const;
    std::vector<Division> get_divisions() const;
    
    Nation* get_nation(const std::string& id);
    Province* get_province(int id);
    
private:
    std::unordered_map<std::string, Nation> nations_;
    std::unordered_map<int, Province> provinces_;
    std::unordered_map<std::string, Division> divisions_;
    
    int year_;
    int month_;
    int day_;
};

} // namespace hoi3
