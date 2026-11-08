cmake_minimum_required(VERSION 3.15)
project(HOI3Backend CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Source files
set(SOURCES
    src/main.cpp
    src/entities/game_state.cpp
    src/api/http_handler.cpp
)

# Executable
add_executable(hoi3_backend ${SOURCES})

# Include directories
target_include_directories(hoi3_backend PRIVATE include)

# Compiler flags
if(MSVC)
    target_compile_options(hoi3_backend PRIVATE /W4)
else()
    target_compile_options(hoi3_backend PRIVATE -Wall -Wextra -Wpedantic)
endif()
