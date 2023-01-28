// api.js
async function fetchData() {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8b80fcf050msh127c9a16542ed70p1442e7jsnd4a62381705d",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };
    const response = await fetch(
      "https://tasty.p.rapidapi.com/tips/list?id=3562&from=0&size=30",
      options
    );
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export default fetchData;
