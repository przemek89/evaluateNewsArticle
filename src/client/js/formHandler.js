function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value


    if(Client.validURL(formText)){
      // if URL valid
      console.log("Form Successfully Submitted")

      postData('http://localhost:8082/meaningCloud', {url: formText})
      .then(function(res) {
          document.getElementById('polarity').innerHTML = `Polarity: ${res.score_tag}`;
          document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
          document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
          document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
          document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
      })
    } else {
      alert("Invalid URL: Re-enter a valid URL.");
    }
}


/* Function to POST data */
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
  };

export { handleSubmit }
