const apiResponse = require('../../helpers/apiResponse');
const models = require('../models');

exports.get = [
    async (req, res) => {
        let cities = await models.cities.findAll({
                    where: {
                        state_id: req.params.stateId,
                    },
                });
        return apiResponse.successResponseWithData(
                    res,
                    'All Cities',
                    cities
                  );
    }
]