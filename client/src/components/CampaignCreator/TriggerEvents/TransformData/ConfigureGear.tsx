import { TypeLocationsData, locationsData } from '../../../static_data_file_configs/LocationsConfig';

const createGearGroup = (categoryKey: keyof TypeLocationsData) => {
    return locationsData[categoryKey].gear.reduce((currentLocationObject, gear) => {
        return {
            ...currentLocationObject,
            [gear]: 0,
        };
    }, {});
};

const ConfigureGear = () => {
    return ['Starting Gear']
        .filter((location) => location && Object.keys(locationsData).includes(location))
        .reduce((currentLocationObject, location) => {
            return location
                ? {
                      ...currentLocationObject,
                      [location]: createGearGroup(location as keyof TypeLocationsData),
                  }
                : { ...currentLocationObject };
        }, {});
};

export default ConfigureGear;
