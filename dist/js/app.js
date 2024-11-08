(() => {
    "use strict";
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }), this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            }));
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                    return item.breakpoint === mediaBreakpoint;
                }));
                matchMedia.addListener((function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                Array.prototype.sort.call(arr, (function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                }));
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
    }
    function dropdown() {
        const buttons = document.querySelectorAll(".dropdown__btn");
        const dropdowns = document.querySelectorAll(".dropdown");
        if (buttons.length) {
            buttons.forEach((btn => {
                btn.addEventListener("click", (e => {
                    e.stopPropagation();
                    const currentDropdown = btn.closest(".dropdown");
                    if (currentDropdown.classList.contains("open")) closeDropdown(); else {
                        currentDropdown.addEventListener("click", (e => e.stopPropagation()));
                        dropdowns.forEach((d => d.classList.remove("open")));
                        currentDropdown.classList.add("open");
                        document.body.addEventListener("click", closeDropdown);
                    }
                }));
            }));
            function closeDropdown() {
                const currentDropdown = document.querySelector(".dropdown.open");
                if (!closeDropdown) return;
                currentDropdown.classList.remove("open");
                return document.body.removeEventListener("click", closeDropdown);
            }
        }
    }
    function burger() {
        const burgerBtn = document.querySelector("#btn-burger");
        const burger = document.querySelector("#burger");
        const header = document.querySelector(".header");
        burgerBtn.addEventListener("click", (e => {
            e.stopPropagation();
            if (burger.classList.contains("open")) handleClose(); else {
                burger.classList.add("open");
                burgerBtn.classList.add("active");
                setTimeout((() => header.classList.add("open-burger")), 1e3);
                document.body.classList.add("body-hidden");
                burger.addEventListener("click", (e => e.stopPropagation()));
                document.body.addEventListener("click", handleClose);
            }
        }));
    }
    function handleClose() {
        const burger = document.querySelector("#burger");
        const burgerBtn = document.querySelector("#btn-burger");
        const header = document.querySelector(".header");
        burger.classList.remove("open");
        document.body.classList.remove("body-hidden");
        burgerBtn.classList.remove("active");
        header.classList.remove("open-burger");
        document.body.removeEventListener("click", handleClose);
    }
    function select_select() {
        const buttonsSelect = document.querySelectorAll(".select__btn");
        const selects = document.querySelectorAll(".select");
        if (buttonsSelect.length) {
            buttonsSelect.forEach((btn => {
                btn.addEventListener("click", (e => {
                    const isInput = btn.dataset.isInput;
                    e.stopPropagation();
                    if (!isInput) {
                        const currentSelect = btn.closest(".select");
                        const input = currentSelect.querySelector(".select__input");
                        if (currentSelect.classList.contains("open")) selectClose(); else {
                            selects.forEach((s => s.classList.remove("open")));
                            currentSelect.addEventListener("click", (e => {
                                e.stopPropagation();
                                if (e.target.classList.contains("select__btn-other")) {
                                    const currentArrow = currentSelect.querySelector(".select__arrow");
                                    const currentIcon = currentSelect.querySelector(".select__icon");
                                    if (currentIcon) currentIcon.remove();
                                    if (currentArrow) currentArrow.remove();
                                    input.style.pointerEvents = "all";
                                    input.focus();
                                    input.value = "";
                                    selectClose();
                                    btn.setAttribute("data-is-input", true);
                                    return;
                                }
                                if (e.target.classList.contains("select__item-btn")) {
                                    input.value = e.target.textContent;
                                    selectClose();
                                }
                            }));
                            currentSelect.classList.add("open");
                            document.addEventListener("click", selectClose);
                        }
                    }
                }));
            }));
            function selectClose() {
                const currentSelect = document.querySelector(".select.open");
                if (!currentSelect) return;
                currentSelect.classList.remove("open");
                return document.removeEventListener("click", selectClose);
            }
        }
    }
    function selectInput() {
        const selectInputs = document.querySelectorAll(".select-input__input");
        if (selectInputs.length) selectInputs.forEach((input => {
            input.addEventListener("change", (e => {
                const value = input.type === "date" ? e.target.value.split("-").reverse().join(".") : e.target.value;
                const currentSelect = input.closest(".select-input");
                const title = currentSelect.querySelector(".select-input__title");
                title.textContent = value;
            }));
        }));
    }
    function reserveLink() {
        const reserveBtn = document.querySelector("#reserve-btn");
        if (reserveBtn) reserveBtn.addEventListener("click", (e => {
            e.preventDefault();
            const depature = document.querySelector("#depature").value;
            const destination = document.querySelector("#destination").value;
            const date = document.querySelector("#date").value;
            const time = document.querySelector("#time").value;
            const passengers = document.querySelector("#passengers").value;
            const flightNumber = document.querySelector("#flight-number").value;
            const link = `?depature=${depature}&destination=${destination}&date=${date}$time=${time}&passengers=${passengers}&flightNumber=${flightNumber}`;
            window.location.href = link;
        }));
    }
    function sides() {
        const btnOneSide = document.querySelector("#one-side");
        const btnTwoSide = document.querySelector("#two-side");
        const parentSide = document.querySelector(".reserv__sidebar");
        if (parentSide) {
            btnOneSide.addEventListener("click", (() => parentSide.classList.add("one-route")));
            btnTwoSide.addEventListener("click", (() => parentSide.classList.remove("one-route")));
        }
    }
    function more() {
        const moreWrappers = document.querySelectorAll(".more");
        if (moreWrappers.length) moreWrappers.forEach((parent => {
            const showItems = +parent.dataset.moreShow;
            const currentItems = parent.querySelectorAll(".more__item");
            const currentButton = parent.querySelector(".more__btn");
            let startEl = showItems;
            Array.from(currentItems).slice(showItems).forEach((item => item.classList.add("none")));
            currentButton.addEventListener("click", (() => {
                Array.from(currentItems).slice(startEl, startEl + showItems).forEach((item => item.classList.remove("none")));
                startEl += showItems;
                if (startEl >= currentItems.length) currentButton.remove();
            }));
        }));
    }
    function initSelectInput() {
        const inputsDate = document.querySelectorAll(".input-date");
        const inputsTime = document.querySelectorAll(".input-time");
        if (inputsDate.length) inputsDate.forEach((i => initDate(i)));
        if (inputsTime.length) inputsTime.forEach((i => initTime(i)));
        function initDate(input) {
            const currentDate = new Date;
            const dateTitle = input.closest("div").querySelector(".select-input__title");
            const currentDay = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
            const currentMonth = currentDate.getMonth() + 1 < 10 ? "0" + currentDate.getMonth() : currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            dateTitle.textContent = `${currentDay}.${currentMonth}.${currentYear}`;
            input.value = `${currentYear}-${currentMonth}-${currentDay}`;
        }
        function initTime(input) {
            const currentDate = new Date;
            const timeTitle = input.closest("div").querySelector(".select-input__title");
            const currentHours = currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours();
            const currentMinutes = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
            timeTitle.textContent = `${currentHours}:${currentMinutes}`;
            input.value = `${currentHours}:${currentMinutes}`;
        }
    }
    function headerScroll() {
        const header = document.querySelector(".header");
        if (!header.classList.contains("_black")) {
            const heightHeader = header.clientHeight;
            window.addEventListener("scroll", (() => {
                if (window.scrollY > heightHeader) header.classList.add("_black"); else header.classList.remove("_black");
            }));
        }
    }
    mediaAdaptive();
    spoller();
    dropdown();
    burger();
    select_select();
    selectInput();
    reserveLink();
    more();
    initSelectInput();
    sides();
    headerScroll();
})();