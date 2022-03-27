window.addEventListener("load", () => {
  const urlData = 'https://raw.githubusercontent.com/jmblack15/FrontEnd-Mentor-Challenges/main/Time-tracking-dashboard/data.json';
  const previusTime = document.querySelectorAll('.previus-time');
  const currentTIme = document.querySelectorAll('.current-time');

  const getData = async () => {
    const response = await fetch(urlData);
    const data = await response.json();
    return data;
  };

  const buttons = document.querySelectorAll('.buttons');
  buttons.forEach(async button => {
    let obj = await getData();

    button.addEventListener('click', () => {
      buttons.forEach(items => {
        items.classList.remove('active-button')
      });
      button.classList.add('active-button');

      const period = button['dataset']['period'];

      currentTIme.forEach(current => {
        const activity = obj.find(({ title }) => {
          return title === current["dataset"]["activity"];
        })
        current.textContent = activity['timeframes'][period]['current'] + 'hrs';
      })

      previusTime.forEach(previus => {
        const activity = obj.find(({ title }) => {
          return title === previus['dataset']['activity'];
        })
        previus.textContent = 'Previus - ' + activity['timeframes'][period]['previous'] + 'hrs';
      });

    });
  });
});
