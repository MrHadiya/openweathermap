
const express = require("express");
const axios = require('axios');

module.exports.getCityPollutionData = async (request, response) => {
    try {
        const { lat, lon } = request.query;

        const res = await axios.get('http://api.openweathermap.org/data/2.5/air_pollution', { params: { lat: lat, lon: lon, appid: APIKEY } });
        var finalArray = []
        if (res.data && res.data.list && res.data.list[0].components) {
            const polData = res.data.list[0].components

            var no2Qua = ''
            var pm10Qua = ''
            var o3Qua = ''
            var pm2_5Qua = ''

            if (polData.pm10 > 0 && polData.pm10 < 25) pm10Qua = 'Good'
            if (polData.no2 > 0 && polData.no2 < 50) no2Qua = 'Good'
            if (polData.o3 > 0 && polData.o3 < 60) o3Qua = 'Good'
            if (polData.pm2_5 > 0 && polData.pm2_5 < 15) pm2_5Qua = 'Good'


            if (polData.pm10 > 25 && polData.pm10 < 50) pm10Qua = 'Fair'
            if (polData.no2 > 50 && polData.no2 < 100) no2Qua = 'Fair'
            if (polData.o3 > 60 && polData.o3 < 120) o3Qua = 'Fair'
            if (polData.pm2_5 > 15 && polData.pm2_5 < 30) pm2_5Qua = 'Fair'


            if (polData.pm10 > 50 && polData.pm10 < 90) pm10Qua = 'Moderate'
            if (polData.no2 > 100 && polData.no2 < 200) no2Qua = 'Moderate'
            if (polData.o3 > 120 && polData.o3 < 180) o3Qua = 'Moderate'
            if (polData.pm2_5 > 30 && polData.pm2_5 < 55) pm2_5Qua = 'Moderate'


            if (polData.pm10 > 90 && polData.pm10 < 180) pm10Qua = 'Poor'
            if (polData.no2 > 200 && polData.no2 < 400) no2Qua = 'Poor'
            if (polData.o3 > 180 && polData.o3 < 240) o3Qua = 'Poor'
            if (polData.pm2_5 > 55 && polData.pm2_5 < 110) pm2_5Qua = 'Poor'


            if (polData.pm10 > 180) pm10Qua = 'Very Poor'
            if (polData.no2 > 400) no2Qua = 'Very Poor'
            if (polData.o3 > 240) o3Qua = 'Very Poor'
            if (polData.pm2_5 > 110) pm2_5Qua = 'Very Poor'



            finalArray = {

                "co": polData.co ? polData.co : '-',
                "no": polData.no ? polData.no : '-',
                "no2": polData.no2 ? polData.no2 : '-',
                "no2_qua": no2Qua,
                "o3": polData.o3 ? polData.o3 : '-',
                "o3_qua": o3Qua,
                "so2": polData.so2 ? polData.so2 : '-',
                "pm2_5": polData.pm2_5 ? polData.pm2_5 : '-',
                "pm2_5_qua": pm2_5Qua,
                "pm10": polData.pm10 ? polData.pm10 : '-',
                "pm10_qua": pm10Qua,
                "nh3": polData.nh3 ? polData.nh3 : '-'
            }


        }
        return response.json({ status: true, message: "Sign up successfully.", data: finalArray });

    } catch (Err) {
        console.log(Err);
        return response.json({ status: false, message: "Something is wrong.Please try again.", data: [], error: Err });
    }
}
