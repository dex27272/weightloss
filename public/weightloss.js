const url = "weightloss.csv";
const url1 = "dataJson.json";
const xLabelDino = [];
const xLabelDani = [];
const dataWeightDino = [];
const dataUmfangDino = [];
const dataWeightDani = [];
const dataUmfangDani = [];
const chartDefault = Chart.defaults.global;

chartDefault.defaultFontColor = "beige";
chartDefault.defaultFontFamily = '"Montserrat", sans - serif';

const chartOptionsGewicht = {
	scales: {
		yAxes: [
			{
				ticks: {
					min: 80,
					max: 110
					// Include a kg sign in the ticks
					// callback: function(value, index, values) {
					// 	return value + " kg";
					// }
				}
			}
		]
	}
};
const chartOptionsUmfang = {
	scales: {
		yAxes: [
			{
				ticks: {
					min: 80,
					max: 110
					// Include a cm sign in the ticks
					// callback: function(value, index, values) {
					// 	return value + " cm";
					// }
				}
			}
		]
	}
};
const chartIt = async () => {
	await getDataJSON();
	// var ctx = document.getElementById("gewichtDino").getContext("2d");
	// var myChart = new Chart(ctx, {
	// 	type: "line",
	// 	data: {
	// 		labels: xLabelDino,
	// 		datasets: [
	// 			{
	// 				label: "Gewicht",
	// 				data: dataWeightDino,
	// 				backgroundColor: "rgba(255, 99, 132, 0.2)",
	// 				borderColor: "rgba(255, 99, 132, 1)",
	// 				borderWidth: 1
	// 			}
	// 		]
	// 	},
	// 	options: chartOptionsGewicht
	// });
	var ctx2 = document.getElementById("umfangDino").getContext("2d");
	var myChart2 = new Chart(ctx2, {
		type: "line",
		data: {
			labels: xLabelDino,
			datasets: [
				{
					label: "Umfang in cm",
					data: dataUmfangDino,
					backgroundColor: "rgba(50, 99, 132, 0.2)",
					borderColor: "rgba(50, 99, 132, 1)",
					borderWidth: 1
				},
				{
					label: "Gewicht in kg",
					data: dataWeightDino,
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",
					borderWidth: 1
				}
			]
		},
		options: chartOptionsUmfang
	});
	// var ctx3 = document.getElementById("gewichtDani").getContext("2d");
	// var myChart3 = new Chart(ctx3, {
	// 	type: "line",
	// 	data: {
	// 		labels: xLabelDani,
	// 		datasets: [
	// 			{
	// 				label: "Gewicht",
	// 				data: dataWeightDani,
	// 				backgroundColor: "rgba(255, 99, 132, 0.2)",
	// 				borderColor: "rgba(255, 99, 132, 1)",
	// 				borderWidth: 1
	// 			}
	// 		]
	// 	},
	// 	options: chartOptionsGewicht
	// });
	var ctx4 = document.getElementById("umfangDani").getContext("2d");
	var myChart4 = new Chart(ctx4, {
		type: "line",
		data: {
			labels: xLabelDani,
			datasets: [
				{
					label: "Umfang",
					data: dataUmfangDani,
					backgroundColor: "rgba(50, 99, 132, 0.2)",
					borderColor: "rgba(50, 99, 132, 1)",
					borderWidth: 1
				},
				{
					label: "Gewicht",
					data: dataWeightDani,
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",
					borderWidth: 1
				}
			]
		},
		options: chartOptionsUmfang
	});
};
//csv Version
const getData = async () => {
	const response = await fetch(url);
	const data = await response.text(response);
	const table = data.split("\n").slice(1);
	table.forEach((row) => {
		const cols = row.split(",");
		const datumDino = cols[0];
		const datumDani = cols[3];
		xLabelDino.push(datumDino);
		xLabelDani.push(datumDani);
		const gewichtDino = cols[1];
		const gewichtDani = cols[4];
		dataWeightDino.push(gewichtDino);
		dataWeightDani.push(gewichtDani);
		const bauchUmfangDino = cols[2];
		const bauchUmfangDani = cols[5];
		dataUmfangDino.push(bauchUmfangDino);
		dataUmfangDani.push(bauchUmfangDani);
	});
};
// Json version
const getDataJSON = async () => {
	const response = await fetch("/api");
	const data = await response.json();

	data.forEach((item) => {
		if (item.user === "Dani") {
			item.datum.forEach((datum) => xLabelDani.push(datum));
			item.gewicht.forEach((gewicht) => dataWeightDani.push(gewicht));
			item.umfang.forEach((umfang) => dataUmfangDani.push(umfang));
		} else {
			item.datum.forEach((datum) => xLabelDino.push(datum));
			item.gewicht.forEach((gewicht) => dataWeightDino.push(gewicht));
			item.umfang.forEach((umfang) => dataUmfangDino.push(umfang));
		}
	});
};

chartIt();

const exampleData = [
	{
		id: 1,
		user: "Dino",
		datum: [
			"13.05.2019",
			"19.05.2019",
			"26.05.2019",
			"02.06.2019",
			"09.06.2019"
		],
		gewicht: ["97.5", "96.4", "95.5", "95.2", "95.5"],
		umfang: ["109", "108.5", "108", "108", "108"]
	},
	{
		id: 2,
		user: "Dani",
		datum: [
			"13.05.2019",
			"20.05.2019",
			"26.05.2019",
			"03.06.2019",
			"12.06.2019"
		],
		gewicht: ["99.2", "97.1", " 98", " 97.7", "97"],
		umfang: ["109", "107", "107", "106", "106"]
	}
];
const options = {
	method: "POST",
	body: JSON.stringify(exampleData),
	headers: {
		"Content-Type": "application/json"
		// 'Content-Type': 'application/x-www-form-urlencoded',
	}
};

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	if (form.users.value === "wähle deinen Benutzer") {
		alert("bitte einen user wählen");
		return;
	}
	const collection = {
		name: form.users.value,
		datum: form.datum.value,
		gewicht: form.gewicht.value,
		umfang: form.umfang.value
	};

	const options = {
		method: "POST",
		body: JSON.stringify(collection),
		headers: {
			"Content-Type": "application/json"
			// 'Content-Type': 'application/x-www-form-urlencoded',
		}
	};
	const response = await fetch("/add", options);
	const json = await response.json();
	console.log(json); // data coming back from server
	location.reload();
});
