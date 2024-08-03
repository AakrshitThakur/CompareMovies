// Initializing all the objects for our needs
const LeftForm = document.querySelector('#LeftForm');
const RightForm = document.querySelector('#RightForm');
const LeftInput = document.getElementsByName("LeftInput")[0];
const RightInput = document.getElementsByName("RightInput")[0];
const LeftButton = document.querySelector('#LeftForm > button');
const RightButton = document.querySelector('#RightForm > button');
let LeftMovieAvgRating, RightMovieAvgRating = null;
let LeftMovieName, RightMovieName = null;
//end

// To prevent the default behaivour of Forms 
LeftForm.addEventListener('submit', (event) => {
    event.preventDefault();
});
RightForm.addEventListener('submit', (event) => {
    event.preventDefault();
});
//end

// Priting or accessing all the data that we got from LeftButton and RightButton event listeners
function PrintOnScreen(ResponseObj, DoForLeftMovie) {

    //Initializing all the objects/ HTML-objects-collection for each rows of table
    const LeftImg = document.querySelector('#LeftImg');
    const RightImg = document.querySelector('#RightImg');
    const spans = document.querySelectorAll('tr>td>span');
    const DisplayResult = document.querySelector('#DisplayResult');
    //end

    //Printing for left movies/web-series/shows
    if (DoForLeftMovie) {
        LeftMovieName = `${ResponseObj.data.name}`;
        LeftImg.src = `${ResponseObj.data.image.medium}`;
        spans[0].innerHTML = `<b>Summary: </b>${ResponseObj.data.summary}`;
        spans[2].innerHTML = `<b>Premiered in: </b>${ResponseObj.data.premiered}`;
        const genres = ResponseObj.data.genres;
        spans[4].innerHTML = '<b>Genre: </b>';
        for (let index = 0; index < genres.length; index++) {
            if (index == genres.length - 1) {
                spans[4].append(`${genres[index]}.`);
                break;
            }
            spans[4].append(`${genres[index]}, `);
        }
        spans[6].innerHTML = `<b>Language: </b>${ResponseObj.data.language}`;
        LeftMovieAvgRating = ResponseObj.data.rating.average;
        spans[9].innerHTML = `<b>Avg Rating: </b>${LeftMovieAvgRating}`;
    }
    //end

    //Printing for right movies/web-series/shows
    else {
        RightMovieName = `${ResponseObj.data.name}`;
        RightImg.src = `${ResponseObj.data.image.medium}`;
        spans[1].innerHTML = `<b>Summary: </b>${ResponseObj.data.summary}`;
        spans[3].innerHTML = `<b>Premiered in: </b>${ResponseObj.data.premiered}`;
        const genres = ResponseObj.data.genres;
        spans[5].innerHTML = '<b>Genre: </b>';
        for (let index = 0; index < genres.length; index++) {
            if (index == genres.length - 1) {
                spans[4].append(`${genres[index]}.`);
                break;
            }
            spans[5].append(`${genres[index]}, `);
        }
        spans[7].innerHTML = `<b>Language: </b>${ResponseObj.data.language}`;
        RightMovieAvgRating = ResponseObj.data.rating.average;
        spans[11].innerHTML = `<b>Avg Rating: </b>${RightMovieAvgRating}`;
    }
    //end

    //Comparing average ratings of both the movies for printing it to DisplayResult
    if ((LeftMovieAvgRating == null) || (RightMovieAvgRating == null)) {
        spans[8].innerHTML = spans[10].innerHTML = '?';
        spans[8].classList.replace('FillGreenColor', 'FillWhiteColor');
        spans[8].classList.replace('FillRedColor', 'FillWhiteColor');
        spans[10].classList.replace('FillGreenColor', 'FillWhiteColor');
        spans[10].classList.replace('FillRedColor', 'FillWhiteColor');
        DisplayResult.innerHTML = 'Unable to determine which movie has a higher rating becasuse of "null" average ratings &#x1F622;';
    }
    //end

    //Modifications for ColorContainers {green: above, red: below, white: tie or null}
    else {
        if (LeftMovieAvgRating > RightMovieAvgRating) {
            spans[8].innerHTML = '&#x2713;';
            spans[10].innerHTML = '&#x2717;';
            spans[8].classList.replace('FillWhiteColor', 'FillGreenColor');
            spans[8].classList.replace('FillRedColor', 'FillGreenColor');
            spans[10].classList.replace('FillWhiteColor', 'FillRedColor');
            spans[10].classList.replace('FillGreenColor', 'FillRedColor');
            DisplayResult.innerHTML = `<b>${LeftMovieName}</b> has a higher average rating than <b>${RightMovieName}</b>`;
        }
        else if (LeftMovieAvgRating < RightMovieAvgRating) {
            spans[10].innerHTML = '&#x2713;';
            spans[8].innerHTML = '&#x2717;';
            spans[10].classList.replace('FillWhiteColor', 'FillGreenColor');
            spans[10].classList.replace('FillRedColor', 'FillGreenColor');
            spans[8].classList.replace('FillWhiteColor', 'FillRedColor');
            spans[8].classList.replace('FillGreenColor', 'FillRedColor');
            DisplayResult.innerHTML = `<b>${RightMovieName}</b> has a higher average rating than <b>${LeftMovieName}</b>`;
        }
        else {
            spans[8].innerHTML = '?';
            spans[10].innerHTML = '?';
            spans[8].classList.replace('FillGreenColor', 'FillWhiteColor');
            spans[8].classList.replace('FillRedColor', 'FillWhiteColor');
            spans[10].classList.replace('FillGreenColor', 'FillWhiteColor');
            spans[10].classList.replace('FillRedColor', 'FillWhiteColor');
            DisplayResult.innerHTML = `<b>${LeftMovieName}</b> has the same average rating as <b>${RightMovieName}</b>`;
        }
    }
    //end

    //Reset the input existing string
    LeftInput.value = RightInput.value = '';
    //end
}
//end

// Adding event listeners for buttons to fetch data from "https://api.tvmaze.com" using axios
LeftButton.addEventListener('click', async () => {
    const UserSearch = `${LeftInput.value}`;
    const config = { params: { q: UserSearch } }
    const ResponseObj = await axios.get('https://api.tvmaze.com/singlesearch/shows/', config);
    PrintOnScreen(ResponseObj, true);
});
RightButton.addEventListener('click', async () => {
    const UserSearch = `${RightInput.value}`;
    const config = { params: { q: UserSearch } }
    const ResponseObj = await axios.get('https://api.tvmaze.com/singlesearch/shows/', config);
    PrintOnScreen(ResponseObj, false);
});
//end