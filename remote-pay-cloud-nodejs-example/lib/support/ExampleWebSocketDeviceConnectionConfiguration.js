(function (module) {
    const clover = require("remote-pay-cloud");

    var deviceConnectionConfiguration = module.exports;

    /**
     * Returns a network or cloud connection configuration based on the passed parameters.
     *
     * @param connectionConfiguration
     * @param useCloud
     * @returns {target}
     */
    deviceConnectionConfiguration.create = function (connectionConfiguration, useCloud) {
        let deviceConfiguration = null;
        if (useCloud) {
            // Cloud Configuration.
            deviceConfiguration = new clover.WebSocketCloudCloverDeviceConfiguration(
                connectionConfiguration.remoteApplicationId,
                connectionConfiguration.webSocketFactoryFunction,
                connectionConfiguration.imageUtil,
                connectionConfiguration.cloverServer,
                connectionConfiguration.accessToken,
                connectionConfiguration.httpSupport,
                connectionConfiguration.merchantId,
                connectionConfiguration.deviceId,
                connectionConfiguration.friendlyId,
                connectionConfiguration.forceReconnect);
        } else {
            // Network Configuration.
            deviceConfiguration = new clover.WebSocketPairedCloverDeviceConfiguration(
                connectionConfiguration.endpoint,
                connectionConfiguration.remoteApplicationId,
                connectionConfiguration.posName,
                connectionConfiguration.serialNumber,
                connectionConfiguration.authToken,
                connectionConfiguration.webSocketFactoryFunction,
                connectionConfiguration.imageUtil);
            // Append the pairing code handlers to the device configuration.
            deviceConfiguration = Object.assign(deviceConfiguration, {
                onPairingCode: function (pairingCode) {
                    console.log(`    > Entering Pairing Code on Device: ${pairingCode}`);
                },
                onPairingSuccess: function (authToken) {
                    console.log(`    > Got Pairing Auth Token: ${authToken}`);
                }
            });
        }
        return Object.create(deviceConfiguration);
    };
})(module);

