$(document).ready(function() {
    
    // -------------------- LOAD SAVED THEME ------------------- //
    var savedTheme = localStorage.getItem("savedTheme");
    var savedLogo = localStorage.getItem("savedLogo");
    
    // Check if a theme has been chosen, if not, set default color
    if (savedTheme == null) {
        savedTheme = "rgb(1, 173, 203)"
        $(".homeButton").css("background-color", savedTheme)
        $("#theme1").addClass("themeSelected");
    } else {
        $(".homeButton, .menuButton, input[type=submit]").css("background-color", savedTheme);
        $(".contact, .modalContent").css("color", savedTheme);
        
        $(".themePicker").each(function(index, element){
            if ($(this).css("background-color") == savedTheme) {
                $(this).addClass("themeSelected");
            }
        });
    }
    
    // If theme hasn't been chosen, set the default logo
    if (savedLogo == null) {
        $(".menuLogo").attr("src", "images/CoreInsurance.png?modified=20161101");
    } else {
        $(".menuLogo").attr("src", savedLogo);
    }
     
    
    
    
    // ------------------------ ANIMATE MODAL ----------------------- //
    $(".nav").slideDown();
    $(".menuLogo").fadeIn(1000);
    $(".contact").fadeIn(1000);
    $(".modal").fadeIn();

    // Animate modal when home button is clicked
    $(".homeButton").click(function(event) {
        // Hide welcome content
        $(".modalContent").fadeOut();
                
        // Enlarge the modal
        $(".modal").animate({
            height: '75%',
            width: '80%',
            top: '24%',
            borderRadius: '20'
        }).promise()
            .done(function () {
             $(".summaryView").fadeIn();
        });
    });
    
    
    
    
    // ------------------ EXPAND FORM OF SELECTED AREA ------------------ //
    $("#personalButton").click(function(event) { 
        
        // Hide other menu buttons
        $(".menuButton")
            .not("#personalButton")
            .slideUp();
        $(".summaryDetails").slideUp();

        $(".personalDetails").slideDown();
        
        // Hide the edit button and change cursor
        $(".editButton").hide();
        $("#personalButton").css("cursor", "initial");
        
    });
    
            
    $("#carButton").click(function(event) {
        
        $(".menuButton").not("#carButton").slideUp();
        $(".summaryDetails").slideUp();
        
        $(".carDetails").slideDown();
        
        $(".editButton").hide();
        $("#carButton").css("cursor", "initial");
        
    });
    
    
    $("#licenseButton").click(function(event) {
        
        $(".menuButton").not("#licenseButton").slideUp();
        $(".summaryDetails").slideUp()
        
        $(".licenseDetails").slideDown();
        
        $(".editButton").hide();
        $("#licenseButton").css("cursor", "initial");
        
    });
            
    
    $("#coverButton").click(function(event) {
        
        $(".menuButton").not("#coverButton").slideUp();
        $(".summaryDetails").slideUp();
        
        $(".coverDetails").slideDown();
        
        $(".editButton").hide();
        $("#coverButton").css("cursor", "initial");
        
    });
    
    
    
    // ---------------- UPDATE QUOTATION SUMMARY --------------------- //
    function updateQuotation () {
        $("#summaryMake").html("<b>Make: </b>" + $("#carMake").val());
        $("#summaryModel").html("<b>Model: </b>" + $("#carModel").val());
        $("#summaryYear").html("<b>Year: </b>" + $("#carYear").val());
        $("#summaryFuel").html("<b>Fuel: </b>" + $("#carFuel").val());

        $("#summaryName").html("<b>Name: </b>" + $("#titleSelect").val() + " " + $("#lastName").val());
        $("#summaryMarital").html("<b>Marital Status: </b>" + $("#maritalStatus").val());
        $("#summaryEmail").html("<b>Email: </b>" + $("#emailAddress").val());
        $("#summaryPhone").html("<b>Phone: </b>" + $("#phoneNumber").val());
    }
    
    
    
    // ---------------- USE AJAX TO GET JSON DATA --------------------- //
    $.getJSON({
        url: "useruote.json",
        cache: false,
        dataType: "json",
        success: function(json) {

            // Loop through each object in the personal data
            // Extract the keys and values
            // Inject the values into the input with the same key as the ID
            $.each(json.personal, function( key, val) {
                $("#" + key).val(val);
                $("." + key).val(val);
            });
            
            $.each(json.car, function( key, val) {
                $("#" + key).val(val);
                $("." + key).val(val);
            });
            
            $.each(json.license, function( key, val) {
                $("#" + key).val(val);
                $("." + key).val(val);
            });
            
            $.each(json.cover, function( key, val) {
                $("#" + key).val(val);
                $("." + key).val(val);
            });
            
            // Show this data in the quotation summary
            updateQuotation();
        },
        error: function() {
            $.ajax({
                url: "failure.html",
                dataType: "html",
                success: function(failureText) {
                    $(".modalContent").html(failureText);
                }
            });
        }
    });
    
    
    
    
    // ---------------- HIGHLIGHT CURRENT DIV --------------------- //      
    $(".inputContent").mouseover(function(){
        $(this).css("background", "rgba(255,255,255, 0.55)");
    });
            
    $(".inputContent").mouseout(function(){
        $(this).css("background-color", "transparent");
    });
    
    
    // Change color of menu button when moused over
    $(".menuButton:not(#summaryButton)").mouseover(function() {
       $(this).css("background-color", "#34495E"); 
    });
    
    $(".menuButton:not(#summaryButton)").mouseout(function() {
       $(this).css("background-color", savedTheme); 
    });
    
    
    
    // ------------------ JQUERY UI METHODS --------------------- //
    
    // Create an array of cars to autocomplete
    var availableCars = [
        "Alpha Romeo",
        "Aston Martin",
        "Audi",
        "BMW",
        "Chevrolet",
        "Citroen",
        "Fiat",
        "Ford",
        "Honda",
        "Hyundai",
        "Kia",
        "Mazda",
        "Peugeot",
        "Renault",
        "Toyota",
        "Volkswagen",
        "Volvo",
        "Vauxhall"
    ];
    
    
    // Autocomplete the car make when typing
    $( "#carMake" ).autocomplete({
      source: availableCars
    });
    
    
    // jQuery UI Tooltip
    $( document ).tooltip();
    
    
    // Set date of birth max date
    $( ".dob" ).datepicker({
        maxDate: "-192M",
        changeMonth: true,
        changeYear: true
    });
    
    // Set policy start max date
    $( ".policyStart" ).datepicker({
        minDate: "1D",
        maxDate: "30D",
        changeMonth: true,
        changeYear: true
    });
    
    
    // Format Date
    $( "#datepicker" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
    $( "#policyStart" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
    
    
    
    // ---------------- UPDATE DETAILS METHODS --------------------- //
	function clickValidation(context) {
		
		var errors = [];
		var validated;
        
        // Search for DOM for input errors
		$(".inputError").each(function() {
			errors.push(this);
		});
		
		for (var i = 0; i < errors.length; i++) {
			
            // For each error that isn't set, animate the window back up
			if($(errors[i]).css("display") != "none") {
				$('.modal').animate({
					scrollTop: $(errors[i]).offset().top +500
				}, 1000);
                
                // Slide down the error and change the background color
				$(errors[i]).slideDown();
				$(errors[i]).parent().css("background", "rgba(244,209,63, 0.55)");
				return false;
			} else {
				validated = true;
			}
		}
		
        // If the validation passes, take the user back to the menu
		if (validated) {
			$(context).parent().prev().css("cursor", "pointer");
			$(".editButton").fadeIn();
            $(context).parent().slideUp();
			$(".menuButton").slideDown()
			$(".summaryDetails").slideDown();
            updateQuotation();
		}
		
	}
	
    
    // Update Personal Details when saved button clicked
    $("#personalForm").submit(function(event) {
        event.preventDefault(); 
        clickValidation($(".personalUpdateBtn"));
        
        // Get DOB
        var dateOfBirth = new Date($(".dob").val());

        // Create new date
        var date = new Date();
        
        // Calculate age
        var age = date.getYear() - dateOfBirth.getYear();
        
        var annualPay;
        var monthlyPay;
        
        // Generate quote based on age
        if (age >= 17 && age <= 25) {
            annualPay = 1700; 
            monthlyPay = annualPay / 10;
            $("#summaryAnnual").html("<b>Annual: </b> &pound;" + annualPay);
            $("#summaryMonthly").html("<b>10 Monthly Payments: </b> &pound;" + monthlyPay);
        } else if (age >= 26 && age <= 40) {
            annualPay = 490;
            monthlyPay = annualPay / 10;
            $("#summaryAnnual").html("<b>Annual: </b> &pound;" + annualPay);
            $("#summaryMonthly").html("<b>10 Monthly Payments: </b> &pound;" + monthlyPay);
        } else {
            annualPay = 650;
            monthlyPay = annualPay / 10;
            $("#summaryAnnual").html("<b>Annual: </b> &pound;" + annualPay);
            $("#summaryMonthly").html("<b>10 Monthly Payments: </b> &pound;" + monthlyPay);
        }    

    });
    
    
    // Update Car Details when saved button clicked
    $("#carForm").submit(function(event) {
        event.preventDefault();
        clickValidation($(".carUpdateBtn"));
    });
    
    
    // Update License Details when saved button clicked
    $("#licenseForm").submit(function(event) {
        event.preventDefault();
        clickValidation($(".licenseUpdateBtn"));
    });
    
    
    // Update License Details when saved button clicked
    $("#coverForm").submit(function(event) {
        event.preventDefault();
        clickValidation($(".coverUpdateBtn"));
    });
    
    
     
    
    // ------------------ GENERATE MONTH/YEAR ------------------- //
    for (var i = 1; i <= 12; i++) {
        if (i.toString().length == 1) {
            i = "0" + i;
        }
        
        // Append numbers to the select
        $("#claimMonth").append($("<option></option>")
                                .attr("value", i)
                                .text(i));
        
        $("#convictionMonth").append($("<option></option>")
                                .attr("value", i)
                                .text(i));
    }
    
    for (var i = 2011; i <= 2016; i++) {
        $("#claimYear").append($("<option></option>")
                                .attr("value", i)
                                .text(i));
        
        $("#convictionYear").append($("<option></option>")
                                .attr("value", i)
                                .text(i));
    }
    
    
    
    // -------------- ADD A NEW CLAIM ----------------- //
    $("#addClaim").click(function(event) {
        // Append the HTML to the selected class
        $(".claimFieldset").append('<div class="claimContent"><input type="button" class="removeClaim" value="Remove Claim" />' + $(".claim").html() + "</div>");
    });
    
    
    // -------------- REMOVE CLAIM ----------------- //
    $(".claimFieldset").on("click", ".removeClaim", function(event) {
        // Get the parent of the current claim and remove the HTML
        $(this).parent().remove()
    });
    
    
    
    // -------------- ADD A NEW CONVICTION ----------------- //
    $("#addConviction").click(function(event) {
        $(".convictionFieldset").append('<div class="convictionContent"><input type="button" class="removeConviction" value="Remove Conviction" />' + $(".conviction").html() + "</div>");
    });
    
    
    // -------------- REMOVE CONVICTION ----------------- //
    $(".convictionFieldset").on("click", ".removeConviction", function(event) {
        $(this).parent().remove()
    });
    
    
    
    
    // -------------- VALIDATION ----------------- //

    // Display error message
    // Traverse dom by finding parent, then matching children to slide down
    function displayError(context) {
        $(context).parent()
                .children(".inputError")
                .slideDown();
        $(context).parent()
                .children(".inputComplete")
                .fadeOut();
    }
    
    // Hide error message
    function hideError(context) {
        $(context).parent()
                .children(".inputError")
                .slideUp();
        $(context).parent()
                .children(".inputComplete")
                .fadeIn();
    }
    
    
    // Hide error when input has focus
	$(":input").focus(function() {
		$(this).parent()
                .children(".inputError")
                .slideUp();
	});
    
    
    
    // If address line 2 has a value, display completion tick
    function address2HasValue() {
      if ($("#addressLine2").val() == "") {
            $("#addressLine2").parent()
                    .children(".inputComplete")
                    .fadeOut();
        } else {
            $("#addressLine2").parent()
                    .children(".inputComplete")
                    .fadeIn();
        }  
    }
    
    address2HasValue();
    
    $("#addressLine2").blur(function(){
        address2HasValue();
    });
    
    
    
    // Validate for empty fields
    $("#addressLine1, #carRegistration, #carModel, #convictionType").on("input", function(){
        // Get value of input, trim empty spaces and check length isn't 0
        if ($(this).val().trim().length === 0) {
            displayError(this);
        } else {
            hideError(this);
        }
    });
    
    
    // Test for valid email
    function validEmail(email, context) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        // Test regular expression against value
        if (!regex.test(email)) {
            displayError(context);
        } else {
            hideError(context);
        }
    }
    
    
    // Test for valid postcode
    function validPostcode(postcode, context) {
        var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
        
        if(!regex.test(postcode)) {
            displayError(context);
        } else {
            hideError(context);
        }
    }
	
	
    
    // Validate for letters and emptiness
    $("#firstName, #lastName, #town, #county, #carMake").on("input", function() {
        var matches = $(this).val().match(/^[a-zA-Z\s]*$/);
        if (matches == null || $(this).val().trim().length === 0) {
            displayError(this);
        } else {
            hideError(this);
        }
    });
    
    
    
    // Validate car year
    $("#carYear").on("input", function(){
        var carYear = $(this).val();
        if (carYear.trim().length != 4 || carYear > 2016 || carYear < 1960) {
            displayError(this);
        } else {
            hideError(this);
        }
    });

    
    
    // Validate Date of birth
    $(".dob").blur(function(){
        if ($(this).val().trim().length === 0) {
            displayError(this);
        } else {
            hideError(this);
        }
        
        // Validate Date range
        var dob = new Date($(".dob").val());
        
        // Create 2 dates
        var date = new Date();
        var newDate = new Date(date);
        
        // Set the maximum date to 16 years ago
        newDate.setDate(newDate.getDate() - 5820);
        var maxDate = new Date(newDate);
        
        if (dob >= maxDate) {
            displayError(this);
        } else if(dob.trim().length === 0) {
            displayError(this);
        } else {
            hideError(this);
        }

        
        $( "#datepicker" ).datepicker({
           onSelect: function() {
              hideError(this);
           }
        });
    });
    
    
    
    // Validate Email Address
    $("#emailAddress").on("input", function(){
        validEmail($("#emailAddress").val(), this); 
    });
    
    
    // Validate Phone Number
    $("#phoneNumber").on("input", function(){
        if ($("#phoneNumber").val().trim().length >= 10) {
            hideError(this);
        } else {
            displayError(this);
        }
    });
    
    
    // Validate Postcode
    $("#postcode").on("input", function(){
        validPostcode($("#postcode").val(), this);
    });
    
    
    // Validate employment status
    $("#employOther").on("input", function(){
        if ($("#employmentSelect :selected").text() == "Other") {
            if ($(this).val().trim().length === 0) {
                displayError(this);
            } else {
                hideError(this);
            }
        }
    });
    
    
    // Validate policy start
    $(".policyStart").blur(function(){
        if ($(this).val().trim().length === 0) {
            displayError(this);
        } else {
            hideError(this);
        }
        
        // Validate Date range
        var policyStart = new Date($(".policyStart").val());
        
        // Create 2 dates
        var date = new Date();
        var newDate = new Date(date);
        
        // Set the maximum date to + 1 month
        newDate.setDate(newDate.getDate() + 30);
        var maxDate = new Date(newDate);
        console.log(maxDate);
        
        if (policyStart >= maxDate || policyStart < date) {
            displayError(this);
        } else if(policyStart.trim().length === 0) {
            displayError(this);
        } else {
            hideError(this);
        }

        // Hide error when date picked
        $( "#policyStart" ).datepicker({
           onSelect: function() {
              hideError(this);
           }
        });
    });
    
    
    
    
    // ------------------- SHOW/HIDE MORE INPUTS ------------------- //
    
    // Show more employment details
    $("#employmentSelect").change(function(){
        var otherSelected = $("#employmentSelect :selected").text();
        
        if (otherSelected == "Other") {
            $("#employmentOther").slideDown();
            $("#employmentError").slideDown();
        } else {
            $("#employmentOther").slideUp();
            $("#employmentError").slideUp();
        }
    });
	

	// Show car registration input and validate
	var registrationSelected = $("#registrationSelect :selected").text();
	if (registrationSelected == "Yes") {
		$("#registration").slideDown();
        $("#carRegistration").blur(function(){
                if ($(this).val().trim().length === 0) {
                    displayError(this);
                } else {
                    hideError(this);
                }
            })
    } else {
        $("#registration").slideUp();
    }
	
	
    $("#registrationSelect").change(function(){
        var registrationSelected = $("#registrationSelect :selected").text();
        
        if (registrationSelected == "Yes") {
            $("#registration").slideDown();
        } else {
            $("#registration").slideUp();
            $("#carRegistration").parent()
                .children(".inputError")
                .slideUp();
        }
    });
    
    
    // Show more accident details
    $("#accidentClaimSelect").change(function(){
        var claimSelected = $("#accidentClaimSelect :selected").text();
        
        if (claimSelected == "Yes") {
            $("#accidentInput").slideDown();
        } else {
            $("#accidentInput").slideUp();
        }
    });
    
    
    
    // Show more conviction details
    $("#convictionSelect").change(function(){
        var convictionSelected = $("#convictionSelect :selected").text();
        
        if (convictionSelected == "Yes") {
            $("#convictionInput").slideDown();
        } else {
            $("#convictionInput").slideUp();
        }
    });
    
    
    
    
    // ---------------------------- COOKIE ------------------------------ //
    function setCookie(name, value, expLength) {
        var date = new Date();
        date.setTime(date.getTime() + (expLength*24*60*60*1000));
        var expiry = "expires=" + date.toGMTString();
        document.cookie = name + "=" + value + ";" + expiry + ";path=/";
    }
    
    // Get the cookie by splitting it
    // loop through array and return the name
    function getCookie(name) {
        var cookieName = name + "=";
        var cookieArray = document.cookie.split(";");
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }
    
    // Check if cookie doesn't exist
    if (getCookie("name") == "") {
        $("#terms").slideDown();
    }
    
    // Set cookie when agree button clicked
    $("#cookieButton").click(function() {
        setCookie("name", getCookie("name"), 30);
        $("#terms").slideUp();
    });
    
    
    
    
    
    // --------------- CUSTOMISE AND ACCESSIBILITY --------------- //
    
    // Open dialog and set animation
    $( "#settingsDialog" ).dialog({
            autoOpen: false,
              show: {
                effect: "clip",
                duration: 300
              },
              hide: {
                effect: "clip",
                duration: 300
              }
        });
    
    
    // Change background of button when moused over
    $("#settingsButton").mouseover(function() {
        $("#settingsButton").css("background-color", savedTheme)
    });
    
    $("#settingsButton").mouseout(function() {
        $("#settingsButton").css("background-color", "rgba(255,255,255, 0.9)")
    });
    
    
    // Open customise dialog when clicked
    $("#settingsButton").click(function() {
        $( "#settingsDialog" ).dialog("open");
    });
    
    // Add or remove transparent class when toggle changed
    $('#transparency').change(function(){
        if ($("#transparency").is(":checked")) {
            $("#modal").removeClass("modalSolid")
        } else {
            $("#modal").addClass("modalSolid")
        }
    });
    
    
    // Increase or decrease font size using CSS
    $('#largeFont').change(function(){
        if ($("#largeFont").is(":checked")) {
            $("#modal").css("font-size", "25px");
            $(".editButton").css("font-size", "25px");
            $(".modalContent").css("font-size", "26px");
            $(".summaryDetails").css("font-size", "23px");
            $(".inputTitle").css("font-size", "28px");
            $(".inputSubTitle").css("font-size", "19px");
            $("input[type=submit]").css("font-size", "22px");
            $(".textInputStyle").css("font-size", "24px");
            $(".select").css("font-size", "24px");
        } else {
            $("#modal").css("font-size", "18px");
            $(".editButton").css("font-size", "18px");
            $(".modalContent").css("font-size", "22px");
            $(".summaryDetails").css("font-size", "18px");
            $(".inputTitle").css("font-size", "22px");
            $(".inputSubTitle").css("font-size", "15px");
            $("input[type=submit]").css("font-size", "16px");
            $(".textInputStyle").css("font-size", "18px");
            $(".select").css("font-size", "18px");
        }
    });
    
    
    // Change application theme
    $(".themePicker").click(function() {
        var themeSelected = $(this).attr('id');
        var theme;
        var logo;
        
        // Check which theme was selected and set properties
        // Save theme to local storage
        if (themeSelected == "theme1") {
            theme = "rgb(1, 173, 203)"
            logo = "images/CoreInsurance.png?modified=20161101";
            localStorage.setItem("savedTheme", theme);
            localStorage.setItem("savedLogo", logo);
        } else if (themeSelected == "theme2") {
            theme = "rgb(3, 174, 32)"
            logo = "images/CoreInsurance2.png?modified=20161101";
            localStorage.setItem("savedTheme", theme);
            localStorage.setItem("savedLogo", logo);
        } else if (themeSelected == "theme3") {
            theme = "rgb(230, 126, 34)"
            logo = "images/CoreInsurance3.png?modified=20161101";
            localStorage.setItem("savedTheme", theme);
            localStorage.setItem("savedLogo", logo);
        } else {
            theme = "rgb(125, 60, 152)"
            logo = "images/CoreInsurance4.png?modified=20161101";
            localStorage.setItem("savedTheme", theme);
            localStorage.setItem("savedLogo", logo);
        }
        
        // get the theme from local storage
        savedTheme = localStorage.getItem("savedTheme");

        // Change styling of selected theme in the colour picker
        $(".themePicker").removeClass("themeSelected");
        $(this).addClass("themeSelected");
        
        // Set the styling on elements based on chosen theme
        $(".homeButton, .menuButton, input[type=submit]").css("background-color", theme);
        $(".contact, .modalContent").css("color", theme);
        $(".menuLogo").attr("src", logo);
        
    });
      
});