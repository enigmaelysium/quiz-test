$(document).ready(function () {
    let quizJSON = [
        {
            "title": "What should you do?",
            "choices": [
                "Remmen",
                "Gas loslaten",
                "Niets",
            ],
            "correctAnswer": 0,
            "pointerEvents": false,
            "secondsLeft": 8,
            "AnsweredQue": "",
            "image": "assets/pic1.png"
        },
        {
            "title": "What should you do?",
            "choices": [
                "Remmen",
                "Gas loslaten",
                "Niets",
            ],
            "correctAnswer": 0,
            "pointerEvents": false,
            "secondsLeft": 8,
            "AnsweredQue": "",
            "image": "assets/pic2.png"
        },
        {
            "title": "What should you do?",
            "choices": [
                "Remmen",
                "Gas loslaten",
                "Niets",
            ],
            "correctAnswer": 0,
            "pointerEvents": false,
            "secondsLeft": 8,
            "AnsweredQue": "",
            "image": "assets/pic3.png"
        },
    ]
    quizJSON = JSON.stringify(quizJSON);
    const quiz = JSON.parse(quizJSON);
    console.log(quiz);
    // Json work finished
    var quizLength = quiz.length;
    var questionnumber = -1;
    let scndsLftOfQueArr = [];
    let radioBtnChecked = [];

    // Some work for DOM Manipulation start


    $("#mainButton").click(function () {
        $(".quizh1").text("Rules");
        $(".descriptionh3").text("Read the Rules and understand them.");
        $(this).parent().fadeIn();
        $(this).parent().parent().remove();
        $(".info_box").fadeIn();
        $('#tot_Ques').text(quizLength);
        $('#QNSize').text(quizLength);
    });


    $(".quit").click(function () {
        location.reload();
    });

    $(".continue").click(function () {
        $(".quizbody").slideUp(1000);
        $(".questionbody").fadeIn(1000);
        questionnumber++;
        countTotalTime();
        showquestionnum();
        showquestion();
        diablingButtons();
        saveRadioBtnValue();
        // startTimeLeft();
        // checkTODisabelPointer();
    });

    $('.btn').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.btn').on('mouseleave', function () {
        $(this).removeClass('active');
    });
    function diablingButtons() {
        if (questionnumber == 0) {
            $(".back").addClass('disable');
        }
        else {
            $(".back").removeClass('disable');
        }
    }
    // Some work for DOM Manipulation end

    //allowing uncheck the radio button -->
    document.querySelectorAll('input[type=radio][name=option]').forEach((elem) => {
        elem.addEventListener('click', allowUncheck);
        elem.previous = elem.checked;
    });


    function allowUncheck(e) {
        if (this.previous) {
            this.checked = false;
        }
        document.querySelectorAll(
            `input[type=radio][name=${this.name}]`).forEach((elem) => {
                elem.previous = elem.checked;
            });
    };
    //allowing uncheck the radio button <--

    // starting the quiz's logical work

    let randomnumber;
    let randomnumarr = [];
    let indexpre = randomnumarr[questionnumber];
    let index = quiz[indexpre];

    //getting the random number function -->
    function getrandomnumber() {
        randomnumber = Math.floor(Math.random() * quizLength - 1) + 1;
    };
    //getting the random number function <--

    //checking the Random Number for not getting same number -->
    function checkRandomNumber() {
        for (let i = 0; i < 31; i++) {
            getrandomnumber()
            let checkRN = jQuery.inArray(randomnumber, randomnumarr);
            if (checkRN == -1) {
                randomnumarr[questionnumber] = randomnumber;
                break;
            }
        }
        indexpre = randomnumarr[questionnumber];
        index = quiz[indexpre]
    }
    //checking the Random Number for not getting same number <--


    //showing the QUESTIONS function -->
    function showquestion() {
        radioButtons = $("input:radio[name='option']");
        if (questionnumber < randomnumarr.length) {
            indexpre = randomnumarr[questionnumber];
            index = quiz[indexpre]
            $(".que_text").text(index.title);
            $("label").eq(0).text(index.choices[0]);
            $("label").eq(1).text(index.choices[1]);
            $("label").eq(2).text(index.choices[2]);
            // $("label").eq(3).text(index.choices[3]);
            for (var x = 0; x < radioButtons.length; x++) {
                var idVal = $(radioButtons[x]).attr("id");
                radioBtnCheckedVal = $("label[for='" + idVal + "']").text();
                if (radioBtnCheckedVal === radioBtnChecked[questionnumber]) {
                    radioButtons[x].checked = true;
                }
                if (radioBtnChecked[questionnumber] === " ") {
                    radioButtons[x].checked = false;
                }
            }
            if (questionnumber > 0) {
                resetingTheTime();
            }
            startTimeLeft();
        }
        else {
            checkRandomNumber();
            $(".pic").attr("src", index.image);
            $(".que_text").text(index.title);
            $("label").eq(0).text(index.choices[0]);
            $("label").eq(1).text(index.choices[1]);
            $("label").eq(2).text(index.choices[2]);
            $("label").eq(3).text(index.choices[3]);
            $("input:radio[name='option']").each(function (i) {
                this.checked = false;
            });
            console.log(index.correctAnswer);
            if (questionnumber > 0) {
                resetingTheTime();
            }
            startTimeLeft();
        }
    };
    //showing the QUESTIONS function <--



    //  starting the time of question start function-->
    let secondSetInterval;
    let width;
    let timeOver = false;
    function startTimeLeft() {
        secondSetInterval = setInterval(function () {
            index.secondsLeft -= 1;
            width = (index.secondsLeft / 20) * 100;
            //   $(".time_line").css(
            //       {
            //           "width":`${width}%`,
            //           "transition": "width 1s linear"
            //       }
            //   )
            if (index.secondsLeft < 10) {
                $(".timer_sec").text("0" + index.secondsLeft);
            }
            else {
                $(".timer_sec").text(index.secondsLeft);
            }
            if (index.secondsLeft == 0) {
                timeOver = true
                $(".option_list").addClass("pointerNone");
                index.pointerEvents = true;
                // Check if the marquee element already exists
                if ($("#marquee").length) {
                    // Replace the content of the existing marquee element
                    $("#marquee").html("You cannot select any option Now.");
                } else {
                    // Append a new marquee element
                    $(".quiz_box").prepend(`<marquee id="marquee" class="marquee my-2" width="100%" direction="right" height="20px">
                You cannot select any option Now.
                </marquee>`);
                }
                // $(".time_line").hide();
                clearInterval(secondSetInterval);
            }
        }, 1000);
    };
    //  starting the time of question end function <--


    //  resetting the time of question start function -->
    function resetingTheTime() {
        clearInterval(secondSetInterval);
        secondsForTimeOut = index.secondsLeft;
        scndsLftOfQueArr[questionnumber] = index.secondsLeft;
        secondCount = index.secondsLeft;
        $(".timer_sec").text(index.secondsLeft);
    };
    //  resetting  the time of question end function <--


    //  starting the time of question start function-->
    let totalSetInterval;
    let totaltime = 0;
    function countTotalTime() {
        totalSetInterval = setInterval(function () {
            totaltime += 1;
        }, 1000);
    };
    //  starting the time of question end function <--


    //  calculating the score and storing the checked values in-->
    let radioBtnCheckedVal;
    function saveRadioBtnValue() {
        $("input:radio[name='option']").each(function (i) {
            if ($(this).is(':checked')) {
                var idVal = $(this).attr("id");
                radioBtnCheckedVal = $("label[for='" + idVal + "']").text();
                return false;
            }
            else {
                radioBtnCheckedVal = " "
            }
        });
        var userAns = radioBtnCheckedVal;
        radioBtnChecked[questionnumber] = userAns;
    }
    // calculating the score <--

    //showing the QUESTIONS Number function -->
    function showquestionnum() {
        $(".QNO").text(questionnumber + 1 + " ");
    }
    //showing the QUESTIONS Number function <--


    // ending the quiz's logical work

    // adding the functionalities to buttons starts

    $(".back").click(function () {
        if (questionnumber < 20 && questionnumber >= 1) {
            $(".result").hide();
            $(".next").show();
            $(".skip").removeClass('disable');
            $("#marquee").remove();
            saveRadioBtnValue();
            clearInterval(secondSetInterval);
            questionnumber--;
            showquestionnum();
            showquestion();
            diablingButtons();
            if (index.pointerEvents === true) {
                $(".option_list").addClass("pointerNone");
                // Check if the marquee element already exists
                if ($("#marquee").length) {
                    // Replace the content of the existing marquee element
                    $("#marquee").html("You cannot select any option Now.");
                } else {
                    // Append a new marquee element
                    $(".quiz_box").prepend(`<marquee id="marquee" class="marquee my-2" width="100%" direction="right" height="20px">
                You cannot select any option Now.
                </marquee>`);
                }
                clearInterval(secondSetInterval);
                $(".timer_sec").text("00");
            }
            else {
                $(".option_list").removeClass("pointerNone");
            }

        }
        else {
            diablingButtons();
        }
    });


    $(".next, .skip").click(function () {
        if (questionnumber < quizLength - 1) {
            if (!timeOver) {

                if (!$("input:radio[name='option']:checked").length) {
                    // Display an alert or perform any other action to prompt the user to select a choice
                    let marqueeText = "Please select an option before proceeding.";

                    // Check if the marquee element already exists
                    if ($("#marquee").length) {
                        // Replace the content of the existing marquee element
                        $("#marquee").html(marqueeText);
                    } else {
                        // Append a new marquee element
                        $(".quiz_box").prepend(`<marquee id="marquee" class="marquee my-2" width="100%" direction="right" height="20px">
                ${marqueeText}
            </marquee>`);
                    }

                    return;
                }
            }

            $("#marquee").remove();
            clearInterval(secondSetInterval);
            saveRadioBtnValue();
            questionnumber++;
            showquestionnum();
            showquestion();
            diablingButtons();
            indexpre = randomnumarr[questionnumber];
            index = quiz[indexpre]
            if (index.pointerEvents === true) {
                $(".option_list").addClass("pointerNone");

                // Check if the marquee element already exists
                if ($("#marquee").length) {
                    // Replace the content of the existing marquee element
                    $("#marquee").html("You cannot select any option Now.");
                } else {
                    // Append a new marquee element
                    $(".quiz_box").prepend(`<marquee id="marquee" class="marquee my-2" width="100%" direction="right" height="20px">
                You cannot select any option Now.
                </marquee>`);
                }
                clearInterval(secondSetInterval);
                $(".timer_sec").text("00");
            }
            else {
                $(".option_list").removeClass("pointerNone");
            }
        }
        if (questionnumber == quizLength - 1) {
            $(".skip").addClass('disable');
            $(".next").hide();
            $(".result").show();
        }
    });

    //    making a function for checking results -->
    let CA = 0;
    let SA = 0;
    let WA = 0;
    function checkResults() {
        for (let i = 0; i < randomnumarr.length; i++) {
            let indexpre = randomnumarr[i];
            let index = quiz[indexpre];
            if (radioBtnChecked[i] == index.choices[index.correctAnswer]) {
                console.log("////////////////////////////////////////////////////////////////");
                console.log("radioBtnChecked : ",radioBtnChecked);
                console.log("index : ",index);
                console.log("index.choices : ",index.choices);
                console.log("index.choices[index.correctAnswer] : ",index.choices[index.correctAnswer]);
                console.log("////////////////////////////////////////////////////////////////");
                CA++;
            }
            else if (radioBtnChecked[i] == " ") {
                SA++;
            }
            else {
                WA++;
            }
        }
    }

    //    making a function for checking results <--

    // CHECKING THE PECENTAGE

    let width1 = 0;
    let perc1 = 0;
    function gettingPerc() {
        perc1 = (CA / quizLength) * 100;
        perc1 = Math.round(perc1);
        width1 = perc1;
        $(".perc-line").css({
            "width": `${width1}%`,
            "transition": "width 1s linear"
        });
    }

    let width2 = 0;
    let perc2 = 0;
    function gettingPercTime() {
        perc2 = (totaltime / (8*quizLength)) * 100;
        width2 = perc2;
        $(".time-line").css({
            "width": `${width2}%`,
            "transition": "width 1s linear"
        });
    }
    // CHECKING THE PECENTAGE




    $(".result").click(function () {
        $(".questionbody").remove();
        $(".resultbody").fadeIn();
        saveRadioBtnValue();
        clearInterval(totalSetInterval);
        checkResults();
        gettingPerc();
        gettingPercTime();
        $(".percentage").text(`${perc1}%`);
        $(".skip-ans-given").text(SA);
        $(".wrong-ans-given").text(WA);
        $(".Correct-ans-given").text(CA);
        $(".time").text(totaltime);
    });
    // adding the functionalities to buttons ends
    $(".icons i").click(function () {
        $(this).siblings().css(
            {
                "display": "none"
            }, 1000);
        $(this).css({
            "color": "#007bff"
        });
    });
    $(".restart").click(function () {
        location.reload();
        // document.write("PLEASE RELOAD THE WEB PAGE location.reload doesnot worked in the code pen so i putted this text.");
    });
});