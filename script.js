window.onload = function () {
  const lockpage = document.getElementById('lockpage');
  const loginscreen = document.getElementById('loginscreen');
  const passinp = document.getElementById('passwordinput');
  const errormsg = document.getElementById('errormsg');
  const desktop = document.getElementById('desktop');
  const contextMen = document.getElementById('context-menu');
  const arrowbtn = document.querySelector(".arrowbtn");
  let lastTap = 0;

  // Date and Time
  function updateDateTime() {
    const now = new Date();
    const dateString = now.toDateString();
    const timeString = now.toLocaleTimeString();
    const datetime = document.querySelector('.datetime');
    datetime.textContent = `${dateString} ${timeString}`;
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Login screen toggle
  let clicked = false;
  document.body.addEventListener('click', () => {
    if (!clicked) {
      loginscreen.style.zIndex = 1000;
      lockpage.style.filter = 'blur(17px)';
      clicked = true;
      setTimeout(() => {
        loginscreen.style.zIndex = 0;
        lockpage.style.filter = 'none';
      },50000);
    }
  });

  // Login Validation
  passinp.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
      const enteredpassword = passinp.value;
      if (enteredpassword === "") {
        errormsg.textContent = "Please enter a password.";
        errormsg.style.display = "block";
        errormsg.style.fontSize = "16px";
      } else if (enteredpassword === "linux") {
        errormsg.style.display = "none";
        desktop.style.display = 'block';
        errormsg.style.fontSize = "16px";
        loginscreen.style.display = 'none';
        lockpage.style.display = 'none';
      } else {
        errormsg.textContent = "Wrong password. Try again.";
        errormsg.style.display = "block";
        errormsg.style.fontSize = "16px";
        passinp.value = '';
      }
    }
  });
  arrowbtn.addEventListener('click', function () {
  const enteredpassword = passinp.value;
  if (enteredpassword === "") {
    errormsg.textContent = "Please enter a password.";
    errormsg.style.display = "block";
    errormsg.style.fontSize = "16px";
  } else if (enteredpassword === "linux") {
    errormsg.style.display = "none";
    desktop.style.display = 'block';
    errormsg.style.fontSize = "16px";
    loginscreen.style.display = 'none';
    lockpage.style.display = 'none';
  } else {
    errormsg.textContent = "Wrong password. Try again.";
    errormsg.style.display = "block";
    errormsg.style.fontSize = "16px";
    passinp.value = '';
  }
});


  // Folder Creation Function

  window.createFolder = function () {
    const desktop = document.getElementById('desktop');

    const folder = document.createElement('div');
    folder.className = 'folder';
    const navHeight = document.getElementById('navbar').offsetHeight || 50; // Adjust if needed
    const folderWidth = 80;
    const folderHeight = 80;

    const maxLeft = window.innerWidth - folderWidth - 20;
    const maxTop = window.innerHeight - folderHeight - navHeight - 40;

    folder.style.left = Math.floor(Math.random() * maxLeft) + 'px';
    folder.style.top = Math.floor(Math.random() * (maxTop - navHeight) + navHeight + 10) + 'px';

    const icon = document.createElement('img');
    icon.src = "https://img.icons8.com/fluency/48/folder-invoices.png";
    icon.style.width = "48px";
    icon.style.height = "48px";
    folder.appendChild(icon);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'Untitled Folder';
    folder.appendChild(input);
    desktop.appendChild(folder);
    input.focus();

    function finalizeRename() {
      const name = input.value.trim() || 'Untitled Folder';
      input.remove();

      const label = document.createElement('span');
      label.textContent = name;
      folder.appendChild(label);

      // ✅ Save to file explorer (Desktop section)
      const fileContainer = document.querySelector('#file-explorer #files-container');
      const currentFolder = document.getElementById('current-folder');
      if (currentFolder && currentFolder.textContent === 'Desktop' && fileContainer) {
        const explorerItem = document.createElement('div');
        explorerItem.className = 'file-item';
        explorerItem.textContent = name;
        fileContainer.appendChild(explorerItem);
      }
    }

    input.addEventListener('blur', finalizeRename);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') finalizeRename();
    });

    // ✅ Make folder draggable
    let isDragging = false, offsetX = 0, offsetY = 0;

    folder.addEventListener('mousedown', function (e) {
      isDragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      folder.style.zIndex = 1000;
    });

    document.addEventListener('mousemove', function (e) {
      if (isDragging) {
        folder.style.left = (e.pageX - offsetX) + 'px';
        folder.style.top = (e.pageY - offsetY) + 'px';
      }
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
    });

    document.getElementById("context-menu").style.display = "none";
  };



  window.createTextFile = function () {
    alert("📄 New text document created (simulated)");
    contextMen.style.display = 'none';
  }

  // Right click context menu
  desktop.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showContextMenu(e.pageX, e.pageY);
  });

  // Touch double tap
  desktop.addEventListener('touchend', function (e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      const touch = e.changedTouches[0];
      showContextMenu(touch.pageX, touch.pageY);
    }
    lastTap = currentTime;
  });

  function showContextMenu(x, y) {
    contextMen.style.display = 'block';
    contextMen.style.left = x + 'px';
    contextMen.style.top = y + 'px';
  }

  document.addEventListener('click', function () {
    contextMen.style.display = 'none';
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') contextMen.style.display = 'none';
  });

  window.refreshDesktop = function () {
    const flicker = document.getElementById('desktop-flicker');

    // Add the flicker animation class
    flicker.classList.add('flicker-on');

    // Remove it after animation ends (to allow re-trigger)
    flicker.addEventListener('animationend', () => {
      flicker.classList.remove('flicker-on');
    }, { once: true });

    document.getElementById('context-menu').style.display = 'none';
  }



  window.openTerminal = function () {
    document.getElementById('app-grid').classList.add('hidden');

    alert("🖥️ Opening terminal...");
    contextMen.style.display = 'none';
  }

  window.toggleView = function () {
    alert("👁️ Toggling view...");
    contextMen.style.display = 'none';
  }

  //   power supply popup
  const tray = document.getElementById("system-tray");
  const popup = document.getElementById("system-popup");

  tray.addEventListener("click", function (e) {
    e.preventDefault(); // prevent link click from reloading
    popup.classList.toggle("hidden");
  });

  // Optional: Hide popup if clicking outside
  document.addEventListener("click", function (e) {
    if (!popup.contains(e.target) && !tray.contains(e.target)) {
      popup.classList.add("hidden");
    }
  });


  // mic and volume feature
  const volumeIcon = document.getElementById("volume-icon");
  const micIcon = document.getElementById("mic-icon");

  document.getElementById("volume-toggle").addEventListener("click", () => {
    volumeIcon.classList.toggle("muted");
  });

  document.getElementById("mic-toggle").addEventListener("click", () => {
    micIcon.classList.toggle("muted");
  });

  //   lock feature

  document.getElementById("lock-btn").addEventListener("click", () => {
    lockpage.style.display = 'flex';
    desktop.style.display = "none";
    loginscreen.style.display = 'none';
    passinp.value = '';
    errormsg.style.display = "none";
    lockpage.style.filter = 'none';

    // 👇 Yeh 'clicked' ko har lock ke sath reset kar raha hai
    let clicked = false;

    // 👇 Pehle se lage listener ko hata ke naya laga rahe hain
    const loginClickHandler = () => {
      if (!clicked) {
        loginscreen.style.display = 'flex';
        loginscreen.style.zIndex = 1000;
        lockpage.style.filter = 'blur(17px)';
        clicked = true;

        setTimeout(() => {
          loginscreen.style.zIndex = 0;
          lockpage.style.filter = 'none';
        }, 7000);

        // 👇 Ek baar kaam karne ke baad listener hata do
        document.body.removeEventListener('click', loginClickHandler);
      }
    };

    // 👇 Har baar naye fresh listener ke sath
    document.body.addEventListener('click', loginClickHandler);
  });

  // lock popup

  const powerIcon = document.getElementById("power-icon");
  const powerPopup = document.getElementById("power-popup");

  // Toggle popup on icon click
  powerIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    powerPopup.classList.toggle("hidden");
  });
  const logoutBtn = document.getElementById("logout-btn");
  const lockScreen = document.getElementsByClassName("bg");

  logoutBtn.addEventListener("click", () => {
    // Hide any open windows if needed
    document.querySelectorAll(".window, .app-window, #file-explorer ").forEach(el => {
      el.classList.add("hidden");
    });

    // Show the lock screen
    lockScreen.classList.remove("hidden");

    // Optionally hide the power popup
    powerPopup.classList.add("hidden");
  });


  // Hide popup if clicked outside
  document.addEventListener("click", (e) => {
    if (!powerPopup.contains(e.target) && e.target !== powerIcon) {
      powerPopup.classList.add("hidden");
    }
  });


  // top right nav weather
  weatherWidget.addEventListener("mouseenter", function () {
    weatherPopup.classList.remove("hidden");
  });

  weatherWidget.addEventListener("mouseleave", function (e) {
    // agar mouse popup pe chala jaye, tab band na ho
    const toElement = e.relatedTarget;
    if (!weatherPopup.contains(toElement)) {
      weatherPopup.classList.add("hidden");
    }
  });

  weatherPopup.addEventListener("mouseleave", function (e) {
    const toElement = e.relatedTarget;
    if (!weatherWidget.contains(toElement)) {
      weatherPopup.classList.add("hidden");
    }
  });


  // footerdateandtime
  function updateNavTime() {
    const now = new Date();
    const day = now.toDateString().slice(0, 3); // Mon
    const date = now.getDate();
    const month = now.toLocaleString('default', { month: 'short' }); // Jun
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // 21:15

    document.getElementById('navDatetime').innerHTML = `${day}<br>${month}<br>${date}<br>${time}`;
  }
  updateNavTime();
  setInterval(updateNavTime, 1000);



  // taskbar clock
  const clockWindow = document.getElementById("clockWindow");
  const clockHeader = document.getElementById("clockHeader");
  let isDragging = false, offsetX, offsetY;

  clockHeader.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - clockWindow.offsetLeft;
    offsetY = e.clientY - clockWindow.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      clockWindow.style.left = `${e.clientX - offsetX}px`;
      clockWindow.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // to open the window
  window.openClockWindow = function () {
    document.body.classList.add("show-clock-bg");
    document.getElementById("clockWindow").style.display = "block";
  };
  window.closeClockWindow = function () {
    document.body.classList.remove("show-clock-bg");
    document.getElementById("clockWindow").style.display = "none";
  };
  //  features == close ,min,max
  const minimizeBtn = document.querySelector(".minimize");
  const maximizeBtn = document.querySelector(".maximize");


  let isMaximized = false;
  let prevPosition = { top: 0, left: 0, width: 0, height: 0 };

  minimizeBtn.addEventListener("click", () => {
    clockWindow.style.display = "none";
    document.body.classList.remove("show-clock-bg");
  });

  maximizeBtn.addEventListener("click", () => {
    if (!isMaximized) {
      // Save current position
      prevPosition = {
        top: clockWindow.offsetTop,
        left: clockWindow.offsetLeft,
        width: clockWindow.offsetWidth,
        height: clockWindow.offsetHeight,
      };
      clockWindow.style.top = "0";
      clockWindow.style.left = "0";
      clockWindow.style.width = "100vw";
      clockWindow.style.height = "100vh";
      isMaximized = true;
    } else {
      // Restore previous position
      clockWindow.style.top = prevPosition.top + "px";
      clockWindow.style.left = prevPosition.left + "px";
      clockWindow.style.width = prevPosition.width + "px";
      clockWindow.style.height = prevPosition.height + "px";
      isMaximized = false;
    }
  });

  // live clock
  function updateLiveClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('liveClock').textContent = time;
  }
  setInterval(updateLiveClock, 1000);
  updateLiveClock(); // call once immediately

  // Tab Switching
  const tabs = document.querySelectorAll(".clock-tab");
  const tabContents = document.querySelectorAll(".tab-section");
  const liveClock = document.getElementById("liveClock");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Switch active tab
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Show the related tab content
      const target = tab.getAttribute("data-tab");
      tabContents.forEach(section => {
        if (section.getAttribute("data-tab") === target) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });

      // ✅ Show/hide the real-time clock based on tab
      if (target === "clock") {
        liveClock.style.display = "block";
      } else {
        liveClock.style.display = "none";
      }


    });
  });


  // stopwatch
  let stopwatchInterval;
  let startTime;
  let running = false;
  let stopwatchElapsed = 0;

  function updateStopwatchDisplay() {
    const now = new Date().getTime();
    const elapsed = now - startTime;
    const hrs = String(Math.floor(elapsed / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
    const ms = String(Math.floor((elapsed % 1000) / 10)).padStart(2, '0');
    document.getElementById("stopwatch-display").textContent = `${hrs}:${mins}:${secs}.${ms}`;
  }

  function startStopwatch() {
    if (!running) {
      startTime = new Date().getTime() - stopwatchElapsed;
      stopwatchInterval = setInterval(updateStopwatchDisplay, 10);
      running = true;
    }
  }

  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    running = false;
    stopwatchElapsed = 0;
    document.getElementById("stopwatch-display").textContent = "00:00:00.00";
  }

  document.getElementById("startStopwatch").addEventListener("click", startStopwatch);
  document.getElementById("resetStopwatch").addEventListener("click", resetStopwatch);


  // resizable 
  let isResizing = false;
  let startX, startY, startWidth, startHeight;
  let resizeDirection = "";

  // START resize
  function startResize(e, dir) {
    e.preventDefault();
    isResizing = true;
    resizeDirection = dir;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = clockWindow.offsetWidth;
    startHeight = clockWindow.offsetHeight;
  }

  // RESIZE on mousemove
  function doResize(e) {
    if (!isResizing) return;

    if (resizeDirection === "right" || resizeDirection === "both") {
      const newWidth = startWidth + (e.clientX - startX);
      clockWindow.style.width = newWidth + "px";
    }

    if (resizeDirection === "bottom" || resizeDirection === "both") {
      const newHeight = startHeight + (e.clientY - startY);
      clockWindow.style.height = newHeight + "px";
    }
  }

  // STOP resize
  function stopResize() {
    isResizing = false;
  }

  // 🟢 Add Event Listeners for all handles
  document.querySelector(".resize-handle").addEventListener("mousedown", (e) => startResize(e, "both")); // bottom-right
  document.querySelector(".resize-handle.resize-r").addEventListener("mousedown", (e) => startResize(e, "right")); // right
  document.querySelector(".resize-handle.resize-b").addEventListener("mousedown", (e) => startResize(e, "bottom")); // bottom

  document.addEventListener("mousemove", doResize);
  document.addEventListener("mouseup", stopResize);


  // terminal popup

  // commands fake directories
  let currentDir = "/home/khushi";
  let directories = {
    "/home/khushi": ["Documents", "Downloads", "Pictures"]
  };

  const terminal = document.getElementById("terminal");
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalInput = document.getElementById("terminalInput");
  const header = document.getElementById("terminalHeader");

  // draagable feature 
  header.onmousedown = function (e) {
    e.preventDefault();
    let offsetX = e.clientX - terminal.offsetLeft;
    let offsetY = e.clientY - terminal.offsetTop;

    document.onmousemove = function (e) {
      terminal.style.left = (e.clientX - offsetX) + "px";
      terminal.style.top = (e.clientY - offsetY) + "px";
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  // min max
  // Optional functionality
  document.querySelector(".close-btn").addEventListener("click", () => {
    terminal.classList.add("hidden");
  });

  document.querySelector(".min-btn").addEventListener("click", () => {
    terminal.style.display = "none";
    setTimeout(() => terminal.style.display = "flex", 100); // simulation
  });
  // max
  document.querySelector(".max-btn").addEventListener("click", () => {
    terminal.classList.toggle("fullscreen");
  });
  // min
  const minBtn = document.querySelector(".min-btn");
  minBtn.addEventListener("click", () => {
    terminal.classList.add("minimized");
  });




  window.openTerminal = function () {
    terminal.classList.remove("hidden", "minimized");
    terminalInput.focus();
    printToTerminal("Welcome to Khushi Sharma Linux<br>Type 'help' to see available commands");
  };

  function printToTerminal(text) {
    terminalOutput.innerHTML += `<div>${text}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = terminalInput.value.trim();
      printToTerminal(`<span style="color:white;">$ ${command}</span>`);
      terminalInput.value = "";

      // Split command + args
      const parts = command.split(" ");
      const baseCmd = parts[0];
      const arg = parts[1] || "";

      switch (command) {
        case "echo":
          const echoText = command.slice(" "); // removes "echo "
          printToTerminal(echoText);
          break;

        case "help":
          printToTerminal("Available: help, whoami, clear, lock, shutdown");
          break;
        case "whoami":
          printToTerminal("khushi");
          break;
        case "clear":
          terminalOutput.innerHTML = "";
          break;
        case "lock":
          lockpage.style.display = 'flex';
          desktop.style.display = 'none';
          break;
        case "shutdown":
          desktop.style.display = 'none';
          printToTerminal("System shutting down...");
          break;
        case "pwd":
          printToTerminal("/home/khushi");
          break;

        case "date":
          const now = new Date();
          printToTerminal(now.toString());
          break;
        case "ls":
          const list = directories[currentDir];
          printToTerminal(list && list.length ? list.join("  ") : "No files or directories");
          break;

        case "mkdir":
          if (!arg) {
            printToTerminal("Usage: mkdir <foldername>");
          } else {
            if (!directories[currentDir]) directories[currentDir] = [];
            directories[currentDir].push(arg);
            printToTerminal(`Directory '${arg}' created`);
          }
          break;

        case "cd":
          if (!arg) {
            printToTerminal("Usage: cd <foldername>");
          } else if (directories[currentDir]?.includes(arg)) {
            currentDir += `/${arg}`;
            if (!directories[currentDir]) directories[currentDir] = [];
            printToTerminal(`Changed directory to ${currentDir}`);
          } else {
            printToTerminal(`No such directory: ${arg}`);
          }
          break;

        default:
          printToTerminal("Command not found: " + command);
      }
    }
  });



  // menu app
  // appGrid.classList.add('hidden');

  const appGrid = document.getElementById("app-grid");
  const searchInput = document.getElementById("app-search");
  const closeBtn = document.getElementById("app-close"); // Close button
  const pagination = document.getElementById("pagination");   // Dot container
  const appsPerPage = 18; // 6 apps per row × 3 rows = 18 per page

  // Split apps into pages
  function updatePaginationDots() {
    const appContainer = document.querySelector('.app-icons');
    const apps = Array.from(appContainer.querySelectorAll('.app'));
    const appsPerPage = 18;
    const totalPages = Math.ceil(apps.length / appsPerPage);

    pagination.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      pagination.appendChild(dot);
    }
  }

  function setActiveDotByScroll() {
    const appContainer = document.querySelector('.app-icons');
    const scrollTop = appContainer.scrollTop;
    const pageHeight = appContainer.clientHeight;
    const pageIndex = Math.round(scrollTop / pageHeight);

    const allDots = document.querySelectorAll("#pagination .dot");
    allDots.forEach(dot => dot.classList.remove("active"));
    if (allDots[pageIndex]) {
      allDots[pageIndex].classList.add("active");
    }
  }

  document.querySelector('.app-icons').addEventListener('scroll', () => {
    setActiveDotByScroll();
  });


  // Show/hide app grid
  document.getElementById("menu-btn").addEventListener("click", () => {
    appGrid.classList.toggle("hidden");
    if (!appGrid.classList.contains("hidden")) {
      updatePaginationDots(); // New logic
    }
  });

  // Close button
  closeBtn.addEventListener("click", () => {
    appGrid.classList.add("hidden");
  });

  // Filter apps
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".app").forEach(app => {
      const appName = app.innerText.toLowerCase();
      app.style.display = appName.includes(query) ? "flex" : "none";
    });
    updatePaginationDots();
  });


  const stickyBtn = document.getElementById("sticky-btn");
  const stickyApp = document.getElementById("sticky-app");
  const addNoteBtn = document.getElementById("add-note");
  const notesContainer = document.getElementById("notes-container");
  const stickyHeader = stickyApp.querySelector(".sticky-header");
  const CloseBtn = stickyApp.querySelector(".close-dot");
  const MinBtn = stickyApp.querySelector(".min-dot");
  const MaxBtn = stickyApp.querySelector(".max-dot");

  let stickyDragging = false, stickyOffsetX = 0, stickyOffsetY = 0;
  let stickyInitialized = false;
  let isStickyMaximized = false;
  let previousStickyPos = { top: 0, left: 0, width: 0, height: 0 };

  stickyBtn.addEventListener("click", () => {
    document.getElementById('app-grid').classList.add('hidden');

    stickyApp.classList.remove("hidden");
    if (!stickyInitialized) initStickyNotes();
  });

  function initStickyNotes() {
    stickyInitialized = true;

    // Load saved notes
    loadNotes();

    // Add note
    addNoteBtn.addEventListener("click", () => {
      const noteData = { text: "New Note..." };
      addNoteToDOM(noteData);
      saveNotes();
    });

    // Drag
    stickyHeader.addEventListener("mousedown", (e) => {
      stickyDragging = true;
      const rect = stickyApp.getBoundingClientRect();
      stickyOffsetX = e.clientX - rect.left;
      stickyOffsetY = e.clientY - rect.top;
    });

    document.addEventListener("mousemove", (e) => {
      if (stickyDragging) {
        stickyApp.style.left = `${e.clientX - stickyOffsetX}px`;
        stickyApp.style.top = `${e.clientY - stickyOffsetY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      stickyDragging = false;
    });

    // Controls
    CloseBtn.addEventListener("click", () => {
      stickyApp.classList.add("hidden");
    });

    MinBtn.addEventListener("click", () => {
      stickyApp.style.display = "none";
      setTimeout(() => stickyApp.style.display = "flex", 100);
    });

    MaxBtn.addEventListener("click", () => {
      if (!isStickyMaximized) {
        previousStickyPos = {
          top: stickyApp.offsetTop,
          left: stickyApp.offsetLeft,
          width: stickyApp.offsetWidth,
          height: stickyApp.offsetHeight
        };
        stickyApp.style.top = "0";
        stickyApp.style.left = "0";
        stickyApp.style.width = "100vw";
        stickyApp.style.height = "100vh";
        isStickyMaximized = true;
      } else {
        stickyApp.style.top = previousStickyPos.top + "px";
        stickyApp.style.left = previousStickyPos.left + "px";
        stickyApp.style.width = previousStickyPos.width + "px";
        stickyApp.style.height = previousStickyPos.height + "px";
        isStickyMaximized = false;
      }
    });
  }

  // Adds a note element to DOM
  function addNoteToDOM(noteData, index = null) {
    const note = document.createElement("div");
    note.className = "note";

    const text = document.createElement("div");
    text.contentEditable = true;
    text.textContent = noteData.text;

    const del = document.createElement("button");
    del.className = "delete-note";
    del.textContent = "×";

    note.appendChild(text);
    note.appendChild(del);
    notesContainer.appendChild(note);

    // Save on edit
    text.addEventListener("input", saveNotes);

    // Delete logic
    del.addEventListener("click", () => {
      note.remove();
      saveNotes();
    });
  }

  // Save notes to localStorage
  function saveNotes() {
    const notes = Array.from(notesContainer.children).map(note => {
      return { text: note.firstChild.textContent };
    });
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }

  // Load notes from localStorage
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    notes.forEach(note => addNoteToDOM(note));
  }
  // file explorer
  const explorer = document.getElementById("file-explorer");
  const explorerHeader = document.querySelector(".explorer-header");
  const explorerClose = document.getElementById("explorer-close");
  const folderItems = document.querySelectorAll(".folder-item");
  const filesContainer = document.getElementById("files-container");
  const currentFolderTitle = document.getElementById("current-folder");
  const newFileBtn = document.getElementById("new-file-btn");
  const breadcrumb = document.getElementById('breadcrumb'); // ✅ FIXED: reference moved here
  breadcrumb.textContent = "Home > Documents"; // ✅ FIXED: match initial folder

  // ✅ FIXED: Consistent folder keys to match your sidebar
  let currentFolder = "Documents";
  let fileStructure = JSON.parse(localStorage.getItem("fileStructure")) || {
    Desktop: ["todo.txt", "welcome.txt"],
    Documents: ["Resume.pdf", "Project.txt"],
    Downloads: ["movie.mkv", "music.mp3"],
    Public: ["share.txt", "announcement.md"],
    Pictures: ["image1.jpg", "image2.png"],
    Videos: [],
    Music: ["song.mp3", "beat.wav"]
  };

  function saveToLocalStorage() {
    localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
  }

  function renderFiles(folder) {
    filesContainer.innerHTML = "";
    currentFolderTitle.textContent = folder;
    breadcrumb.textContent = `Home > ${folder}`; // ✅ Update breadcrumb

    const files = fileStructure[folder] || [];

    files.forEach((file, index) => {
      const fileDiv = document.createElement("div");
      fileDiv.className = "file";

      const input = document.createElement("input");
      input.type = "text";
      input.value = file;
      input.draggable = true;
      input.dataset.index = index;

      // ✅ File preview logic
      input.addEventListener("click", () => {
        const fileName = input.value;
        previewTitle.textContent = fileName;
        previewContent.innerHTML = "";

        if (fileName.endsWith(".jpg") || fileName.endsWith(".png")) {
          const img = document.createElement("img");
          img.src = "https://via.placeholder.com/300x200?text=" + encodeURIComponent(fileName);
          previewContent.appendChild(img);
        } else if (fileName.endsWith(".txt")) {
          const text = document.createElement("div");
          text.textContent = "This is a preview of " + fileName;
          previewContent.appendChild(text);
        } else {
          previewContent.textContent = "Preview not available.";
        }

        preview.classList.remove("hidden");
      });

      input.addEventListener("blur", () => {
        fileStructure[folder][index] = input.value;
        saveToLocalStorage();
      });

      const actions = document.createElement("div");
      actions.className = "actions";

      const del = document.createElement("button");
      del.textContent = "🗑";
      del.onclick = () => {
        fileStructure[folder].splice(index, 1);
        saveToLocalStorage();
        renderFiles(folder);
      };

      actions.appendChild(del);
      fileDiv.appendChild(input);
      fileDiv.appendChild(actions);
      filesContainer.appendChild(fileDiv);
    });
  }

  // ✅ Drag and Drop
  let draggedIndex = null;

  filesContainer.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "INPUT") {
      draggedIndex = parseInt(e.target.dataset.index);
      e.target.classList.add("dragging");
    }
  });

  filesContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  filesContainer.addEventListener("drop", (e) => {
    e.preventDefault();

    const dropTarget = e.target;
    if (dropTarget.tagName === "INPUT" && draggedIndex !== null) {
      const droppedIndex = parseInt(dropTarget.dataset.index);

      if (draggedIndex !== droppedIndex) {
        const files = fileStructure[currentFolder];
        const draggedFile = files.splice(draggedIndex, 1)[0];
        files.splice(droppedIndex, 0, draggedFile);
        saveToLocalStorage();
        renderFiles(currentFolder);
      }

      draggedIndex = null;
    }
  });

  filesContainer.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  // ✅ File Preview elements
  const preview = document.getElementById("file-preview");
  const previewContent = document.getElementById("preview-content");
  const previewTitle = document.getElementById("preview-title");
  const closePreview = document.getElementById("close-preview");

  closePreview.addEventListener("click", () => {
    preview.classList.add("hidden");
  });

  // ✅ Right-click Context Menu
  const contextMenu = document.getElementById("file-context-menu");
  let selectedFileInput = null;

  filesContainer.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const target = e.target;

    if (target.tagName === "INPUT" && target.parentElement.classList.contains("file")) {
      selectedFileInput = target;
      contextMenu.style.left = `${e.pageX}px`;
      contextMenu.style.top = `${e.pageY}px`;
      contextMenu.style.display = "block";
    } else {
      contextMenu.style.display = "none";
    }
  });

  document.addEventListener("click", () => {
    contextMenu.style.display = "none";
  });

  // ✅ Context Menu Actions
  document.getElementById("ctx-open").addEventListener("click", () => {
    if (selectedFileInput) {
      alert(`Opening ${selectedFileInput.value}`);
    }
  });

  document.getElementById("ctx-rename").addEventListener("click", () => {
    if (selectedFileInput) {
      selectedFileInput.focus();
      selectedFileInput.select();
    }
  });

  document.getElementById("ctx-delete").addEventListener("click", () => {
    if (selectedFileInput) {
      const fileName = selectedFileInput.value;
      const index = fileStructure[currentFolder].indexOf(fileName);
      if (index !== -1) {
        fileStructure[currentFolder].splice(index, 1);
        saveToLocalStorage();
        renderFiles(currentFolder);
      }
    }
  });

  // ✅ Folder Navigation
  folderItems.forEach(item => {
    item.addEventListener("click", () => {
      currentFolder = item.dataset.folder;
      renderFiles(currentFolder);
    });
  });

  // ✅ Add File Button
  newFileBtn.addEventListener("click", () => {
    if (!fileStructure[currentFolder]) fileStructure[currentFolder] = [];
    fileStructure[currentFolder].push("New File.txt");
    saveToLocalStorage();
    renderFiles(currentFolder);
  });

  // ✅ Close Window
  explorerClose.addEventListener("click", () => {
    explorer.classList.add("hidden");
  });
  const minbtn = document.getElementById("explorer-min");
  const fileBtn = document.getElementById("file-btn"); // Make sure this exists too!

  if (minbtn) {
    minbtn.addEventListener("click", () => {
      explorer.style.display = "none";
    });
  }

  if (fileBtn) {
    fileBtn.addEventListener("click", () => {
      explorer.style.display = "flex";
      explorer.classList.remove("hidden");
    });
  }



  // ✅ Maximize / Restore toggle
  let IsMaximized = false;
  document.getElementById("explorer-max").addEventListener("click", () => {
    if (!IsMaximized) {
      explorer.dataset.prevLeft = explorer.style.left;
      explorer.dataset.prevTop = explorer.style.top;
      explorer.dataset.prevWidth = explorer.style.width;
      explorer.dataset.prevHeight = explorer.style.height;

      explorer.style.left = "0";
      explorer.style.top = "0";
      explorer.style.width = "100vw";
      explorer.style.height = "100vh";
      IsMaximized = true;
    } else {
      explorer.style.left = explorer.dataset.prevLeft;
      explorer.style.top = explorer.dataset.prevTop;
      explorer.style.width = explorer.dataset.prevWidth;
      explorer.style.height = explorer.dataset.prevHeight;
      IsMaximized = false;
    }
  });


  // ✅ Drag Explorer Window
  let isfileDragging = false, offsetx, offsety;
  explorerHeader.addEventListener("mousedown", (e) => {
    isfileDragging = true;
    offsetx = e.clientX - explorer.offsetLeft;
    offsety = e.clientY - explorer.offsetTop;
  });
  document.addEventListener("mousemove", (e) => {
    if (isfileDragging) {
      explorer.style.left = `${e.clientX - offsetx}px`;
      explorer.style.top = `${e.clientY - offsety}px`;
    }
  });
  document.addEventListener("mouseup", () => {
    isfileDragging = false;
  });

  // ✅ Resizable Explorer
  const resizeHandle = document.querySelector(".resize-handle");
  let isfileResizing = false;
  resizeHandle.addEventListener("mousedown", (e) => {
    isfileResizing = true;
    e.preventDefault();
  });
  document.addEventListener("mousemove", (e) => {
    if (isfileResizing) {
      explorer.style.width = `${e.clientX - explorer.offsetLeft}px`;
      explorer.style.height = `${e.clientY - explorer.offsetTop}px`;
    }
  });
  document.addEventListener("mouseup", () => {
    isfileResizing = false;
  });
  // ✅ Open File Explorer Programmatically
  window.openFileExplorer = function () {
    explorer.classList.remove("hidden");
    explorer.style.zIndex = 9999;
    renderFiles(currentFolder);
  };
  document.getElementById("file-btn").addEventListener("click", () => {
    openFileExplorer();
  });
};




