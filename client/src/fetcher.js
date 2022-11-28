import config from './config.json'



const getCorrectnessRateQuestion = async(id) => {
	var res = await fetch (`http://${config.server_host}:${config.server_port}/question`,
 {method: `GET`,
})
return res.json()
}

const getCorrectnessRateSubject = async(id) => {
	var res = await fetch (`http://${config.server_host}:${config.server_port}/subject`,
 {method: `GET`,
})
return res.json()
}


const getCorrectnessByUser = async(id) => {
	var res = await fetch (`http://${config.server_host}:${config.server_port}/userCorrectness?id=${id}`,
 {method: `GET`,
})
return res.json()
}


const getWeaknessStrength = async(id) => {
	var res = await fetch (`http://${config.server_host}:${config.server_port}/weaknessStrength?id=${id}`,
 {method: `GET`,
})
return res.json()
}


const growQuestions = async(id) => {
	var res = await fetch (`http://${config.server_host}:${config.server_port}/grow?id=${id}`,
 {method: `GET`,
})
return res.json()
}



export {
    getCorrectnessRateQuestion,
    getCorrectnessRateSubject,
    getCorrectnessByUser,
    getWeaknessStrength,
    growQuestions,
    
}