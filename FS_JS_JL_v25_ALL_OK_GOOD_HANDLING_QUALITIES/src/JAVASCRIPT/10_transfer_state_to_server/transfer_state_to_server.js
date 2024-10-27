
function sendStateToServer(deltaTime) {
    const aircraftState = {
        x: aircraft.position.x,
        y: aircraft.position.y,
        z: aircraft.position.z,
        vx: velocity.x,
        vy: velocity.y,
        vz: velocity.z,
        qx: orientation.x,
        qy: orientation.y,
        qz: orientation.z,
        qw: orientation.w,
        wx: angularVelocity.x,
        wy: angularVelocity.y,
        wz: angularVelocity.z,
        fx: forceX,  // ignore this
        fy: forceY,  // ignore this 
        thrust_lever: thrust_lever,
        aileron_input: aileron_input,
        elevator_input: elevator_input,
        rudder_input: rudder_input,
        deltaTime: deltaTime
    };

    fetch("http://localhost:8080/api/update", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(aircraftState)
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                console.error("Error: " + response.status);
            }
        })
        .then(responseText => {
            if (responseText) {
                const resultString = responseText.trim();
                // Parse the response stringified JSON format
                const responseData = JSON.parse(resultString);

                // Update aircraft's position, velocity, orientation, and angular velocity
                aircraft.position.x = parseFloat(responseData.x);
                aircraft.position.y = parseFloat(responseData.y);
                aircraft.position.z = parseFloat(responseData.z);

                velocity.x = parseFloat(responseData.vx);
                velocity.y = parseFloat(responseData.vy);
                velocity.z = parseFloat(responseData.vz);

                orientation.x = parseFloat(responseData.qx);
                orientation.y = parseFloat(responseData.qy);
                orientation.z = parseFloat(responseData.qz);
                orientation.w = parseFloat(responseData.qw);

                angularVelocity.x = parseFloat(responseData.wx);
                angularVelocity.y = parseFloat(responseData.wy);
                angularVelocity.z = parseFloat(responseData.wz);

                // Update global force values
                forceGlobalX = parseFloat(responseData.fx_global);
                forceGlobalY = parseFloat(responseData.fy_global);
                forceGlobalZ = parseFloat(responseData.fz_global);

                // Update aircraft's rotation based on orientation quaternion
                aircraft.rotationQuaternion = new BABYLON.Quaternion(orientation.x, orientation.y, orientation.z, orientation.w);

                alpha_DEG = parseFloat(responseData.alpha);
                beta_DEG = parseFloat(responseData.beta);

                updateVelocityLine();
                updateForceLine();

                if (elapsedTime < 20.0) { updateTrajectory()}  // only draw the spheres for the first 20 seconds of the simulation to prevent slow down

            }
        })
        .catch(error => {
            console.error("Error: " + error);
        });
}