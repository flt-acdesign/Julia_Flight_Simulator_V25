
using HTTP, Sockets, CSV, DataFrames, LinearAlgebra, StaticArrays, JSON

# remember to add the corresponding packages in Julia with
#  ]    pkg> add HTTP, Sockets, CSV, DataFrames, LinearAlgebra, StaticArrays, JSON


# load general code and functions

include(raw"./SRC/JULIA/10_maths/quaternions_and_transformations.jl") # quaternion functions
include(raw"./SRC/JULIA/20_physics/runge_kutta_integrator.jl") # Runge-Kutta integrator of equations of motion
include(raw"./SRC/JULIA/50_Aircraft_Model_and_Data/#_aircraft_model_data.jl")  # General and model constants

include(raw"./SRC/JULIA/20_physics/#_compute_6DOF_equations_of_motion.jl") # 6 DOF equations of motion
include(raw"./SRC/JULIA/20_physics/handle_collisions.jl") # Detect ground and handle collisions

include(raw"./SRC/JULIA/40_Atmosphere_and_anemometry/physical_constants.jl") # physical constants and unit conversions
include(raw"./SRC/JULIA/40_Atmosphere_and_anemometry/ISA76.jl") # ISA76 complete model
include(raw"./SRC/JULIA/40_Atmosphere_and_anemometry/anemometry.jl") # equations for anemometry and dynamic pressure etc...

include(raw"./SRC/JULIA/30_HTTP/update_and_write_state.jl")  # receive aircraft state, call RK4.5 and return state to javascript client
include(raw"./SRC/JULIA/30_HTTP/http_router_code.jl") # Launch program in Edge, start the server and write CSV with data at the end of simulation

