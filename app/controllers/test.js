async function getmeetingdata() {
  let names = [];
  let namess = [];
  let Meetingname = document.getElementById("meetingbyname").value;
  var url = "http://localhost:8080/api/tdatas/meetingname/" + Meetingname;
  await (async function f() {
    let data = await (await fetch(url).catch(handleErr)).json();

    if (data.code && data.code == 400) {
      //problem
      return;
    }
    for (let i = 0; i < data.length; i++) {
      namess.push(data[i].name);
    }
  })();
  names = namess.filter((value, index) => namess.indexOf(value) === index);
  let newdata;

  let newArr = [];
  //document.getElementById("getdata").innerHTML = names;
  for (let i = 0; i < names.length; i++) {
    var url = "http://localhost:8080/api/tdatas/getdata/" + names[i];
    (async function f() {
      let data = await (await fetch(url).catch(handleErr)).json();
      if (data.code && data.code == 400) {
        //problem
        return;
      }
      console.log(data);
      newArr.push(data);
      document.getElementById("getdata").innerHTML =
        "Meeting name:" + Meetingname + ": " + JSON.stringify(newArr);
    })();
  }
  function handleErr(err) {
    console.warn(err);
    let resp = new Response(
      JSON.stringify({
        code: 400,
        message: "Stupid network Error",
      })
    );
    return resp;
  }
}

exports.getdata = (req, res) => {
    const name = req.params.name;
    tdata
      .find({ name: name, word: "Umm" })
      .then((data) => {
        mdata = data;
        var Umm = 0;
  
        mdata.forEach((item) => {
          Umm = item.count + Umm;
        });
  
        tdata.find({ name: name, word: "Hmm" }).then((data) => {
          var Hmm = 0;
          data.forEach((item) => {
            Hmm = item.count + Hmm;
          });
          tdata.find({ name: name, word: "Aaa" }).then((data) => {
            var Aaa = 0;
            data.forEach((item) => {
              Aaa = item.count + Aaa;
            });
            tdata.find({ name: name, word: "This" }).then((data) => {
              var This = 0;
              data.forEach((item) => {
                This = item.count + This;
              });
              tdata.find({ name: name, word: "Somephrase" }).then((data) => {
                var Somephrase = 0;
                data.forEach((item) => {
                  Somephrase = item.count + Somephrase;
                });
                tdata.find({ name: name, word: "Otherwords" })
                .then((data) => {
                  var Otherwords = 0;
                  data.forEach((item) => {
                    Otherwords = item.count + Otherwords;
                  });
                  res.send({
                    name: name,
                    Umm: Umm,
                    Hmm: Hmm,
                    Aaa: Aaa,
                    This: This,
                    Somephrase: Somephrase,
                    Otherwords: Otherwords,
                  });
                });
              });
            });
          });
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  };