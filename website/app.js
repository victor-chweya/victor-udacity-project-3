/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=6cdc72475468a3946af98e684716f65d';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newZip =  document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    getWeather (baseURL, newZip, apiKey)
    .then(function(data){
        console.log(data);
        //add data to post request
        postData('/addData', {temp: data.main.temp, date: newDate, feeling:feeling});
        updateUI()
        
    })
   
}

const getWeather = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key) //(baseURL+animal+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error iliopatikana", error);
    // appropriately handle the error
  }
}
const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      return newData;
      
    }catch(error) {
    console.log("error", error);
    }
}
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('content').innerHTML = allData.feeling;

  }catch(error){
    console.log("error", error);
  }
}
// postData('/addData', {temp:42, date: newDate, userData: 'whatsapp'});