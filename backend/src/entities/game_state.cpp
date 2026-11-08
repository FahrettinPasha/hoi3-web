#include "game_state.h"
#include <iostream>

namespace hoi3 {

GameState::GameState() : year_(1939), month_(9), day_(1) {
    // Initialize with default data
}

void GameState::load_scenario(const std::string& scenario_id) {
    std::cout << "Loading scenario: " << scenario_id << std::endl;
    
    // TODO: Load from JSON/SQLite
    // For now, add dummy data
    Nation germany;
    germany.id = "germany";
    germany.name = "Germany";
    germany.color[0] = 100;
    germany.color[1] = 100;
    germany.color[2] = 100;
    germany.money = 5000.0;
    germany.political_power = 150.0;
    germany.stability = 75.0;
    germany.war_support = 50.0;
    
    nations_["germany"] = germany;
    
    Nation uk;
    uk.id = "uk";
    uk.name = "United Kingdom";
    uk.color[0] = 30;
    uk.color[1] = 75;
    uk.color[2] = 155;
    uk.money = 11000.0;
    uk.political_power = 120.0;
    uk.stability = 70.0;
    uk.war_support = 40.0;
    
    nations_["uk"] = uk;
}

void GameState::advance_day() {
    day_++;
    if (day_ > 30) {
        day_ = 1;
        month_++;
        if (month_ > 12) {
            month_ = 1;
            year_++;
        }
    }
    
    std::cout << "Advanced to: " << year_ << "-" << month_ << "-" << day_ << std::endl;
    
    // TODO: Process economy, military, diplomacy
}

std::vector<Nation> GameState::get_nations() const {
    std::vector<Nation> result;
    for (const auto& pair : nations_) {
        result.push_back(pair.second);
    }
    return result;
}

std::vector<Province> GameState::get_provinces() const {
    std::vector<Province> result;
    for (const auto& pair : provinces_) {
        result.push_back(pair.second);
    }
    return result;
}

std::vector<Division> GameState::get_divisions() const {
    std::vector<Division> result;
    for (const auto& pair : divisions_) {
        result.push_back(pair.second);
    }
    return result;
}

Nation* GameState::get_nation(const std::string& id) {
    auto it = nations_.find(id);
    if (it != nations_.end()) {
        return &it->second;
    }
    return nullptr;
}

Province* GameState::get_province(int id) {
    auto it = provinces_.find(id);
    if (it != provinces_.end()) {
        return &it->second;
    }
    return nullptr;
}

} // namespace hoi3
