var headerEl = $('.header')
var currentDayEl = $('#currentDay');
var mainContainerEl = $('#mainContainer');
var modalEl = $('#confirmDelete');
var cancelBtnEl = $('#cancelBtn');
var confirmBtnEl = $('#confirmBtn');
var currentDay = dayjs().format('[Today is] dddd, MMMM Do');
var currentHour24 = dayjs().format('H');
var currentHourID = "hour-" + currentHour24;
var currentHour12 = dayjs().format('hA');
var cardEl = "";
var hourEl = "";
var textAreasEl = "";
var saveButtonEl = "";
var clearButtonEl = "";
var cardID = "";
var selectCardByID = "";

// Show the current day and hour in header
currentDayEl.text(currentDay);
// Generate timeblocks
var renderTimeBlock = function () {
  for (let i = 8; i < 19; i++) {
    var isPast = i < currentHour24;
    var isPresent = i == currentHour24;
    // Create timeblock div
    cardEl = $('<div>');
    // Add attributes to each timeblock
    if (isPast) {
      cardEl.addClass('past')
    } else if (isPresent) {
      cardEl.addClass('present')
    } else {
      cardEl.addClass('future')
    };
    cardEl.addClass('row time-block')
    cardEl.attr('id', 'hour-' + i);
    // Create column for hours, add attributes, and add to timeblock
    hourEl = $('<div>');
    hourEl.addClass('col-2 col-md-1 hour text-center py-3');
    if (i < 12) {
      hourEl.text(i + 'AM');
    } else if (i == 12) {
      hourEl.text(i + 'PM');
    } else {
      hourEl.text(i - 12 + 'PM');
    }
    cardEl.append(hourEl);
    // Create text area for input, add attributes, and add to timeblock
    textAreasEl = $('<textarea>');
    textAreasEl.addClass('col-7 col-md-9 description');
    textAreasEl.attr('rows', '3');
    cardEl.append(textAreasEl);
    // Create save button, add attributes
    saveButtonEl = $('<button>');
    saveButtonEl.addClass('btn saveBtn col-2 col-md-1');
    saveButtonEl.attr('aria-label', 'save');
    saveButtonEl.text('SAVE')
    // Append save button to card
    cardEl.append(saveButtonEl)
    // Create a clear button to clear both textarea and local storage
    clearButtonEl = $('<button>');
    clearButtonEl.addClass('btn clearBtn btn-danger col-1 col-md-1');
    clearButtonEl.attr('disabled', 'disabled');
    clearButtonEl.attr('data-bs-toggle', 'modal');
    clearButtonEl.attr('data-bs-target', '#confirmDelete');
    clearButtonEl.text('CLEAR');
    cardEl.append(clearButtonEl);
    // Append cards (timeblocks) to container
    mainContainerEl.append(cardEl);
  }
  // Use loadText function to load the saved text
  loadText()
}
renderTimeBlock()
// currentHourEl.on("change", renderTimeBlock)
var allSaveBtnsEl = $('.saveBtn');
var allClearBtnsEl = $('.clearBtn');
allSaveBtnsEl.click(getCardID);
allSaveBtnsEl.click(saveText);
allClearBtnsEl.click(getCardID);
confirmBtnEl.click(proceedDelete);
setInterval(updateClass, 1000);

// Function to get card ID
function getCardID(event) {
  var element = event.target;
  cardID = element.parentElement.getAttribute("id");
  selectCardByID = $('#' + cardID);
  return selectCardByID;
};
// Save the text in textarea to local storage
function saveText() {
  var textArea = selectCardByID.children('textarea').val().trim();
  if (textArea === "") {
    window.alert('Please write something to save!')
  } else {
    selectCardByID.children('.clearBtn').removeAttr('disabled');
    localStorage.setItem(cardID + "-textarea", textArea);
  }
};

// Function to delete saved text
function proceedDelete() {
  selectCardByID.children('textarea').val(null);
  selectCardByID.children('.clearBtn').attr('disabled', 'true');
  localStorage.setItem(cardID + "-textarea", "");
};

// Function to load saved text to text areas
function loadText() {
  for (var i = 8; i < 19; i++) {
    let task = localStorage.getItem('hour-' + i + "-textarea");
    if (task) {
      $('#hour-' + i).children('textArea').text(task);
      $('#hour-' + i).children('.clearBtn').removeAttr('disabled');
    }
  }
}
// Function to automatically change the color of timeblocks if the hour is changed
function updateClass() {
  var liveHourID = "hour-" + dayjs().format('H');
  var livePresentCard = $('#' + liveHourID);
  var oldPresentCard = $('.present');
  var oldPresentCardID = $('.present').attr('id');
  var hourIsChanged = (oldPresentCardID !== liveHourID);
  if (hourIsChanged) {
    oldPresentCard.addClass('past');
    oldPresentCard.removeClass('present');
    livePresentCard.addClass('present');
    livePresentCard.removeClass('future');
  };
};

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });
