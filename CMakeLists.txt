cmake_minimum_required(VERSION 3.10)
project(farm-ng-tractor)
list(APPEND CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR}/third_party/ceres-solver/cmake)

include(CMakeToolsHelpers OPTIONAL)


set(PKG_CONFIG_USE_CMAKE_PREFIX_PATH ON)
set(BUILD_SHARED_LIBS ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -Wno-unused-parameter -Wno-unused-but-set-variable -Wno-unused-variable -Wno-unused-function -Wno-maybe-uninitialized -Wno-implicit-fallthrough")
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)


add_subdirectory(third_party/googletest)

find_package(Protobuf REQUIRED)
find_package(Boost REQUIRED system filesystem regex)
find_package(realsense2 REQUIRED)
find_package(apriltag REQUIRED)
find_package(OpenCV REQUIRED)
find_package(Glog REQUIRED)
find_package(gflags REQUIRED)
find_package(Ceres REQUIRED)
find_package(Sophus REQUIRED)

enable_testing()

include(GoogleTest)

include_directories(${Protobuf_INCLUDE_DIRS})
include_directories(${CERES_INCLUDE_DIRS})
include_directories(${CMAKE_CURRENT_BINARY_DIR}/protos)

add_subdirectory(third_party)
add_subdirectory(protos)
include_directories(cpp)
add_subdirectory(cpp/farm_ng)
