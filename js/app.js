/**
 * app.js
 * This is the primary .js file where all of the data that is displayed on the index.html page is styled, edited and appended
 * Throughout this class, the Fetcher.getData method is called each time to retrieve the selected data from the RIT IST API
 * After the data is successfully retrieved (.done), the retrieved data is styled and then appended
 * Some data is displayed through .dialog windows which pop-up when the set div, class or id is clicked.
 * I have seperated each data retrieval into specific sections, so it easier to read and go through the code
 * 
 * Plugins used: .dialog(), DataTable(), accordion()
 * 
 * @author Filipa Ivankovic
 */

//Import the Fetcher.js
import {Fetcher} from './Fetcher.js';

/*
* ABOUT - MAIN HEADER
* Retrieval of the /about data from the API
* The data from the '/about' part of the API is appended into the "#header-section" on the index.html
* 
*/
Fetcher.getData('/about')
    .done(function (json){
        
        //The retrieved json data is put into a jQuery object where it is stringfied and to be used for the index.html page
        let $headerContent = $(`
            <h1 id="header-h1">INFORMATION SCIENCES & TECHNOLOGIES <span class="orange">@RIT</span></h1>
            <div id="header-textBox">
                <h2 id="header-title">${json.title}</h2>
                <hr id="header-hr1">
                <p>${json.description}</p>
                <p id="header-quote"><span class="bold">"</span>${json.quote}<span class="bold">"</span></p>
                <small id="header-quoteAuthor">${json.quoteAuthor}</small>
            <div>
        `);//$headerContent end
        
        //Append to #header-section on index.html
        $('#header-section').append($headerContent);
});//done main header section end

/**
 * NEWS
 * The '#news' id is contained within the navbar itself as one of the clickable links (should be the last one)
 * When the '#news' link is clicked on, the Fetcher.getData class is called to retrieve the data from the 'news' section of the API
 * After the data is retrieved, a new .dialog window is created
 * This dialog window will hold all the 'news' data that was retrieved from the API
 */
$('#news').on('click', function(){
    Fetcher.getData('/news')
    .done(function (json){
        //Creating the .dialog window
        $('<div class="newsWindow"></div>').dialog({
            modal: true,
            title: "News",
            width: 1000,
            hide: 'blind',
            height: 700,
            open: function(){
                //Goes through the whole news json object to get all the data
                $.each(json.older, function(index, item){
                    
                    //jQuery object for each news article from the API
                    let $newsEntry = $(` 
                        <article>
                            <h2 class="newsHeader">${item.title}</h2>
                            <small class="newsDate">Date: ${item.date}</small>
                            <p class="newsText">${item.description}</p>
                            <hr class="newsHr">
                        </article>
                    `);
                    //Each individual article from the API is appended to the .dialog window - the newest articles will end up being the ones who show up on the top
                    $('.newsWindow').append($newsEntry);               
                });
            }//open end
        });//dialog box end
    });//done end
});//news onclick end



/**
 * UNDERGRADUATE
 * The Fetcher.getData() method is called to retrieve data from the '/degrees/undergraduate' section of the RIT IST API
 * The API contains 3 different undergraduate degrees
 * Each degree will have its data displayed within a .dialog window which is displayed once the button beneath the 'h2' & 'p' is clicked
 * The dialog window creation for each undergraduate degree has the same logic, but each of them holds different information from the API
 */
Fetcher.getData('/degrees/undergraduate')
        .done(function (json) {
            //Initial append, which creates the main header and a 'row' div where all the 3 undergraduate degrees will be appended to
            $('#undergraduate-section').append(`
                <div>
                    <h1 id="undergraduate-header">Undergraduate Degrees</h1>
                    <div class="row text-align-center undergraduate-text">
                        
                    <div>
                </div>
            `);
            
            //Append the data for each undergraduate degree as columns into the 'row' div
            $('#undergraduate-section').find('.row').append(`
                <div class="col-sm">
                    <img class="undergraduate-icons" src="../media/Computing_&_Information_Icon.png" alt="Computer Icon">
                    <h2 class="degreeTitles">${json.undergraduate[0].title}</h2>
                    <p>${json.undergraduate[0].description}</p>
                    <button id="underGrad-wmc-btn" type="button" class="btn btn-dark degree-btn">Learn more</button>
                </div>
                <div class="col-sm">
                    <img class="undergraduate-icons" src="../media/Human_centered_Computing_Icon.webp" alt="Human Computing Icon">
                    <h2 class="degreeTitles">${json.undergraduate[1].title}</h2>
                    <p>${json.undergraduate[1].description}</p>
                    <button id="underGrad-hcc-btn" type="button" class="btn btn-dark degree-btn">Learn more</button>
                </div>
                <div class="col-sm">
                    <img class="undergraduate-icons" src="../media/Web_Mobile_Icon.png" alt="Computer & Mobile Icon">
                    <h2 class="degreeTitles">${json.undergraduate[2].title}</h2>
                    <p>${json.undergraduate[2].description}</p>
                    <button id="underGrad-cit-btn" type="button" class="btn btn-dark degree-btn">Learn more</button>
                </div>
            `);
           
            //Undergraduate WMC Button functionality - creates a new dialog window when pressed
           $('#underGrad-wmc-btn').on('click', function(){
               $('<div></div>').dialog({
                      modal: true,
                      title:`${json.undergraduate[0].title}`,
                      width: 600,
                      hide: 'explode',
                      height: 400,
                      open: function(){
                        //Create the jQuery object which will hold the extracted data
                        let $dialogBoxContent = $(`
                            <h2 class="degree-header degree-header-wmc text-align-center">Concentrations</h2>
                            <ul class="concentrationsList justify-content">
                                <li><i class="fas fas fa-laptop-code"></i> ${json.undergraduate[0].concentrations[0]}</li>
                                <li><i class="fas fas fa-mobile-alt"></i> ${json.undergraduate[0].concentrations[1]}</li>
                                <li><i class="fas fas fa-sitemap"></i> ${json.undergraduate[0].concentrations[2]}</li>
                                <li><i class="fas fas fa-globe"></i> ${json.undergraduate[0].concentrations[3]}</li>
                            </ul>
                            <small>
                                <p>To learn more, visit our website:</p>
                                <p><a href="http://wmc.rit.edu">http://wmc.rit.edu</a></p>
                            </small>
                        `);
                        //Append the data for he WMC undergraduate degree into its own dialog window
                        $(this).append($dialogBoxContent);
                      }
                });//dialog box end
           });//underGrad-wmc-btn functionality end
           
           //Undergraduate HCC Button functionality - creates a new dialog window when pressed
           $('#underGrad-hcc-btn').on('click', function(){
               $('<div></div>').dialog({
                      modal: true,
                      title:`${json.undergraduate[1].title}`,
                      width: 600,
                      hide: 'explode',
                      height: 400,
                      open: function(){
                        let $dialogBoxContent = $(`
                            <h2 class="degree-header degree-header-hcc text-align-center">Concentrations</h2>
                            <ul class="concentrationsList justify-content">
                                <li><i class="fas fas fa-universal-access"></i> ${json.undergraduate[1].concentrations[0]}</li>
                                <li><i class="fas fas fa-paint-brush"></i> ${json.undergraduate[1].concentrations[1]}</li>
                                <li><i class="fas fas fa-window-restore"></i> ${json.undergraduate[1].concentrations[2]}</li>
                                <li><i class="fas fas fa-brain"></i> ${json.undergraduate[1].concentrations[3]}</li>
                                <li><i class="fas fas fa-chalkboard-teacher"></i> ${json.undergraduate[1].concentrations[4]}</li>
                                <li><i class="fas fas fa-language"></i> ${json.undergraduate[1].concentrations[5]}</li>
                            </ul>
                            <small>
                                <p>To learn more, visit our website:</p>
                                <p><a href="http://hcc.rit.edu">http://hcc.rit.edu</a></p>
                            </small>
                        `);
                          //Append the data for he HCC undergraduate degree into its own dialog window
                        $(this).append($dialogBoxContent);
                      }
                });//dialog box end
           });//underGrad-hcc-btn functionality end
           
           //Undergraduate CIT Button functionality - creates a new dialog window when pressed
           $('#underGrad-cit-btn').on('click', function(){
               $('<div></div>').dialog({
                      modal: true,
                      title:`${json.undergraduate[2].title}`,
                      width: 600,
                      hide: 'explode',
                      height: 400,
                      open: function(){
                        let $dialogBoxContent = $(`
                            <h2 class="degree-header degree-header-cit text-align-center">Concentrations</h2>
                            <ul class="concentrationsList justify-content">
                                <li><i class="fas fas fa-universal-access"></i> ${json.undergraduate[2].concentrations[0]}</li>
                                <li><i class="fas fas fa-paint-brush"></i> ${json.undergraduate[2].concentrations[1]}</li>
                                <li><i class="fas fas fa-window-restore"></i> ${json.undergraduate[2].concentrations[2]}</li>
                                <li><i class="fas fas fa-brain"></i> ${json.undergraduate[2].concentrations[3]}</li>
                                <li><i class="fas fas fa-chalkboard-teacher"></i> ${json.undergraduate[2].concentrations[4]}</li>
                            </ul>
                            <small>
                                <p>To learn more, visit our website:</p>
                                <p><a href="http://cit.rit.edu">http://cit.rit.edu</a></p>
                            </small>
                        `);
                        //Append the data for he CIT undergraduate degree into its own dialog window  
                        $(this).append($dialogBoxContent);
                      }
                });//dialog box end
           });//underGrad-cit-btn functionality end
});//done undergraduate end


/**
 * GRADUATE DEGREES
 * The Fetcher.getData() method is called to retrieve data from the '/degrees/graduate' section from the RIT IST API
 * This part is very similiar to the undergraduate section as the content is structured and styled in a similiar fashion, bare the few differences
 *  After the .getData() function succefully retrieved the data, the 3 graduate degrees are appended into an initially empty 'row' div which is appended to the '#graduate-section' of the index.html
 *  As in the case of the undergraduate degrees, each graduate degree has a clickable button which will open a .dialog window which will display some additional data and a link for that specific graduate degree
 *  The graduate section is a bit longer due to the 2 additional advanced certificates contained in the API
 */
Fetcher.getData('/degrees/graduate')
    .done(function (json) {
            
        //Initial append - h1 and blank .row
        $('#graduate-section').append(`
            <div>
                <h1 id="graduate-header">Graduate Degrees</h1>
                <div class="row text-align-center graduate-text">
                        
                <div>
            </div>
        `);
            
            //Appending the 3 degrees as columns into the row
            $('#graduate-section').find('.row').append(`
                <div class="col-sm">
                    <img class="undergraduate-icons" src="../media/IST_Icon.png" alt="IST Icon">
                    <h2 class="graduateTitles">${json.graduate[0].title}</h2>
                    <p>${json.graduate[0].description}</p>
                    <button id="grad-ist-btn" type="button" class="btn btn-dark degree-btn">Learn more</button>
                </div>
                <div class="col-sm">
                    <img class="undergraduate-icons" src="../media/HCI_Icon.png" alt="HCI Icon">
                    <h2 class="graduateTitles">${json.graduate[1].title}</h2>
                    <p>${json.graduate[1].description}</p>
                    <button id="grad-hci-btn" type="button" class="btn btn-dark degree-btn">Learn more</button>
                </div>
                <div class="col-sm">
                    <img class="undergraduate-icons" src="../media/Network_Icon.png" alt="Network Icon">
                    <h2 class="graduateTitles">${json.graduate[2].title}</h2>
                    <p>${json.graduate[2].description}</p>
                    <button id="grad-nsa-btn" type="button" class="btn btn-dark degree-btn">Learn more</button>
                </div>
            `);
           
            //Graduate IST Button functionality - when clicked, it will open the .dialog window
           $('#grad-ist-btn').on('click', function(){
               $('<div></div>').dialog({
                      modal: true,
                      title:`${json.graduate[0].title}`,
                      width: 600,
                      hide: 'explode',
                      height: 400,
                      open: function(){
                        let $dialogBoxContent = $(`
                            <h2 class="degree-header degree-header-ist text-align-center">Concentrations</h2>
                            <ul class="concentrationsList justify-content">
                                <li><i class="fas fas fa-database"></i> ${json.graduate[0].concentrations[0]}</li>
                                <li><i class="fas fas fa-network-wired"></i> ${json.graduate[0].concentrations[1]}</li>
                                <li><i class="fas fas fa-code-branch"></i> ${json.graduate[0].concentrations[2]}</li>
                            </ul>
                            <small>
                                <p>To learn more, visit our website:</p>
                                <p><a href=" http://it.rit.edu"> http://it.rit.edu</a></p>
                            </small>
                        `);
                        //Append the $dialogBoxContent jQuery object intot the .dialog window  
                        $(this).append($dialogBoxContent);
                      }
                });//dialog box end
           });//grad-ist-btn functionality end
           
           //Graduate HCI Button functionality - when clicked, it will open the .dialog window
           $('#grad-hci-btn').on('click', function(){
               $('<div></div>').dialog({
                      modal: true,
                      title:`${json.graduate[1].title}`,
                      width: 600,
                      hide: 'explode',
                      height: 400,
                      open: function(){
                        let $dialogBoxContent = $(`
                            <h2 class="degree-header degree-header-hci text-align-center">Concentrations</h2>
                            <ul class="concentrationsList justify-content">
                                <li><i class="fas fas fa-wifi"></i> ${json.graduate[1].concentrations[0]}</li>
                                <li><i class="fas fas fa-globe"></i> ${json.graduate[1].concentrations[1]}</li>
                                <li><i class="fas fas fa-clinic-medical"></i> ${json.graduate[1].concentrations[2]}</li>
                                <li><i class="fas fas fa-chalkboard"></i> ${json.graduate[1].concentrations[3]}</li>
                                <li><i class="fas fas fa-memory"></i> ${json.graduate[1].concentrations[4]}</li>
                                <li><i class="fas fas fa-user-shield"></i> ${json.graduate[1].concentrations[5]}</li>
                            </ul>
                            <small>
                                <p>To learn more, visit our website:</p>
                                <p><a href="http://hci.rit.edu">http://hci.rit.edu</a></p>
                            </small>
                        `);
                        //Append the $dialogBoxContent jQuery object intot the .dialog window    
                        $(this).append($dialogBoxContent);
                      }
                });//dialog box end
           });//underGrad-hcc-btn functionality end
           
            //Graduate nsa Button functionality - when clicked, it will open the .dialog window
            $('#grad-nsa-btn').on('click', function(){
               $('<div></div>').dialog({
                      modal: true,
                      title:`${json.graduate[2].title}`,
                      width: 600,
                      hide: 'explode',
                      height: 400,
                      open: function(){
                        let $dialogBoxContent = $(`
                            <h2 class="degree-header degree-header-nsa text-align-center">Concentrations</h2>
                            <ul class="concentrationsList justify-content">
                                <li><i class="fas fas fa-search"></i> ${json.graduate[2].concentrations[0]}</li>
                                <li><i class="fas fas fa-user-tie"></i> ${json.graduate[2].concentrations[1]}</li>
                                <li><i class="fas fas fa-tasks"></i> ${json.graduate[2].concentrations[2]}</li>
                            </ul>
                            <small>
                                <p>To learn more, visit our website:</p>
                                <p><a href="http://nsa.rit.edu"> http://nsa.rit.edu</a></p>
                            </small>
                        `);
                        //Append the $dialogBoxContent jQuery object intot the .dialog window    
                        $(this).append($dialogBoxContent);
                      }//open end
                });//dialog box end
           });//grad-nsa-btn functionality end
    
    //Additional row for the 2 advanced certificates from the graduate API part
    let $graduateCertificate =$(`
        <div class="row">
            <div class="col-sm">
                <h3 class="capitalize certificate-header">${json.graduate[3].degreeName}</h3>
                <img class="img-fluid certificate-icons" src="../media/HTML5.webp" alt="HTML5 Icon">
                <p><a class="certificate-a" href="https://www.rit.edu/study/networking-planning-and-design-adv-cert">${json.graduate[3].availableCertificates[0]}</a></p>
                <img class="img-fluid certificate-icons" src="../media/Network.png" alt="Network Icon">
                <p><a class="certificate-a" href="https://www.rit.edu/study/web-development-adv-cert">${json.graduate[3].availableCertificates[1]}</a></p>
            </div>
        </div>
    `);
    //Final append to the graduate section 
    $('#graduate-section').append($graduateCertificate);
});//done graduate end


/**
 * MINORS
 * The Fether.getData() method is called to retrieve the json data from the RIT IST API from the '/minors' section
 * After an initial append fpr the main header, and some additional text which explains the '#minors-section', the $.each is used to create an interactable div for every Undergraduate minor from the API
 * Each $minorDiv can be clicked on, where a .dialog window will pop-p which will showcase some additional data for that particular undergraduate minor degree
 */
Fetcher.getData('/minors')
    .done(function (json){
        //The initial data which is at the top of the section
        //The "#minors-list" ul element will hold all the minor divs
        let $initial = $(`
            <div id="minorsTitle">
                <h1 id="minors-header">Undergraduate Minors</h1>
                <p>The selection of courses we offer</p>
                <p><small>Expand your field of study</small></p>
            </div>
            <ul id="minorsList" class="row">
            
            </ul>
        `);
        //Appending $initial
        $('#minors-section').append($initial);
        
        //Create a div for each undergrad minor from the API
        //After appending, every minor div is given .on functionality which opens a .dialog window
        $.each(json.UgMinors, function(index,item){
            let $minorDiv = $(`
                <div id="minor-${index}" class="minorDiv col-md-2 col-xs-4">
                    <div id="minorIconContainer-${index}">
                    </div>
                    <div>
                        <h5>${item.title}</h5>
                    </div>
                    
                </div>
            `);
            //Apend the div to the ul list
            $('#minorsList').append($minorDiv);
            
            //Interactibility for the minor div - opens dialog when clicked on
            $minorDiv.on('click', function(){
                $('<div></div>').dialog({
                    modal: true,
                    title:`${item.title}`,
                    width: 800,
                    hide: 'explode',
                    height: 600,
                    open: function(){
                        let $dialogBox = $(`
                           <div>
                                <p>${item.description}</p>
                                <ul class="courseList"></ul>
                                <p><small>${item.note}</small></p>
                           </div>
                        `);
                        //Append the content to the dialog window
                        $(this).append($dialogBox);
                        
                        //Goes through the inner 'courses' json object, and appends each item to the ul list "courseList" (in the $dialogBox)
                        //Each minor undergrad degree has this 'courses' inner json object with a different number of them
                        $.each(item.courses, function(i, course){
                            let $newCourse = $(`<li>${course}</li>`);
                            $(".courseList").append($newCourse);
                        });
                    }//open end
                });//dialog end        
            });//onclick for minorsDiv end
        });//each end

        //Inserting Visual Icons for each undergraduate minor after each was succesfully appended
        //These icons are only for visual flair
        $('#minorIconContainer-0').before($(`<i class="fas fas fa-database"></i>`));
        $('#minorIconContainer-1').before($(`<i class="fas fas fa-map-marker-alt"></i>`));
        $('#minorIconContainer-2').before($(`<i class="fas fas fa-heartbeat"></i>`));
        $('#minorIconContainer-3').before($(`<i class="fas fas fa-code"></i>`));
        $('#minorIconContainer-4').before($(`<i class="fas fas fa-mobile-alt"></i>`));
        $('#minorIconContainer-5').before($(`<i class="fas fas fa-network-wired"></i>`));
        $('#minorIconContainer-6').before($(`<i class="fab fa-html5"></i>`));
        $('#minorIconContainer-7').before($(`<i class="fas fas fa-ethernet"></i>`));
});//Minors fetch data end


/**
 * EMPLOYMENT
 * The Fetcher.getData() method is called to retrive the '/employment' data from the API - the coopTable & employment Table have their own method calls, despite being in the 'employment' API section
 * A jQuery object $employmentDiv is created which will hold the primary majority of the content from this section of the API
 * The '$.each' is used twice here to retrieve the names of the employers and careers, which are always random on every startup of the index.html
 * Content is appended to the '#employmentStatistics-section' of the index.html
 */
Fetcher.getData('/employment')
    .done(function (json){
        
        //To be appended to the '#employmentStatistics-section'       
        let $employmentDiv = $(`
                <h2>${json.introduction.title}</h2>
                <h4 class="employmentHeader">${json.introduction.content[0].title}</h4>
                <hr class="employmentHr">
                <p class="employmentText">${json.introduction.content[0].description}</p>
                <div id="statisticBoxesDiv" class="row">
                    <div id="statisticBox-1" class="col statisticBox">
                        <h3 class="statisticHeader">${json.degreeStatistics.statistics[0].value}</h3>
                        <p>${json.degreeStatistics.statistics[0].description}</p>
                    </div>
                    <div id="statisticBox-2" class="col statisticBox">
                        <h3 class="statisticHeader">${json.degreeStatistics.statistics[1].value}</h3>
                        <p>${json.degreeStatistics.statistics[1].description}</p>
                    </div>
                    <div id="statisticBox-3" class="col statisticBox">
                        <h3 class="statisticHeader">${json.degreeStatistics.statistics[2].value}%</h3>
                        <p>${json.degreeStatistics.statistics[2].description}</p>
                    </div>
                    <div id="statisticBox-4" class="col statisticBox">
                        <h3 class="statisticHeader">${json.degreeStatistics.statistics[3].value}</h3>
                        <p>${json.degreeStatistics.statistics[3].description}</p>
                    </div>
                </div>
                <h4 class="employmentHeader">${json.introduction.content[1].title}</h4>
                <hr class="employmentHr">
                <p class="employmentText">${json.introduction.content[1].description}</p>
                <h3 class="employmentHeader">${json.employers.title}</h3>
                <hr class="employmentHr">
                <div id="employersList" class="row">
                  
                </div>
                <h3 class="employmentHeader">${json.careers.title}</h3>
                <hr class="employmentHr">
                <div id="careersList" class="row">
                  
                </div>
                <div class="employment-smallText">*Employers/Careers are randomly pulled from our recent graduates</div>
        `);//$employmentDiv end
        //
        //Append the $employmentDiv to the '#employmentStatistics-section' of the index.html
        $('#employmentStatistics-section').append($employmentDiv);//Apend to the Faculty ul list
        
        //Goes over the employerNames json object to get the names - random on each page startup
        $.each(json.employers.employerNames, function (index, employer){
            let $employer = $(`<span class="employersCareersEl col">${employer}</span>`);
            $('#employersList').append($employer);
        });
        
        //Goes over the careerNames json object to get the names - random on each page startup
        $.each(json.careers.careerNames, function (index, career){
            let $career = $(`<span class="employersCareersEl col">${career}</span>`);
            $('#careersList').append($career);
        });      
});//employment done getData end


/**
 * COOP & EMPLOYMENT TABLES
 * The Fetcher.getData() method is called to once again retrieve data from the 'employment' section of the RIT IST API, but this time for the coopTable & employmentTable data
 * After creating the divs for the coopTable & employmentTable, each div is given a .on('click') functionality
 * Pressing the divs opens their respective .dialog windows, which will contain the data for the coopTable & employmentTable structured in a datatable done by the DataTable plugin
 * The Datatable is interactive and showcases correctly all of the data
 */
Fetcher.getData('/employment')
    .done(function (json){
        //COOP TABLE
        let $tableDivs = $(`
            <h2 class="text-align-center">Where Our Students Work</h2>
            <p class="text-align-center"><small id="tables-header">To view employment and coop history of our students, click below.</small></p>
            <ul class="row text-align-center">
                <li id="coopTable" class="col coopTable tablesDiv">
                    <h5>${json.coopTable.title}</h5>
                </li>
                <li id="employmentTable" class="col tablesDiv">
                    <h5>${json.employmentTable.title}</h5>
                </li>
            </ul>
        `);
        //Append the 2 divs for the tables
        $('#map-section').append($tableDivs);
        
        //ONLICK FUNCTIONALITY FOR COOPTABLE
        $('.coopTable').on('click', function(){
            $('<div class="coopTableDialog"></div>').dialog({
                modal: true,
                title:`${json.coopTable.title}`,
                width: 1000,
                hide: "explode",
                height: 700,
                open: function(){               
                    let $innerTable = $(`
                        <table class="test" class="display">
                            <thead>
                                <tr>
                                    <th>Degree</th>
                                    <th>Employer</th>
                                    <th>Location</th>
                                    <th>Term</th>
                                </tr>
                            </thead>
                            <tbody id="coopTableBody">
                            </tbody>
                        </table>
                    `);
                    //Apend the DataTable structure to the dialog windows
                    $('.coopTableDialog').append($innerTable);
                    
                    //Extract the table data for the DataTable
                    $.each(json.coopTable.coopInformation, function(coopIndex, coopItem){
                        let $coopData = $(`
                            <tr>
                                <td>${coopItem.degree}</td>
                                <td>${coopItem.employer}</td>
                                <td>${coopItem.city}</td>
                                <td>${coopItem.term}</td>
                            </tr>
                        `);
                        
                        //Append the data to the table's body
                        $('#coopTableBody').append($coopData);
                    });
                    //After appending activate the Coop Data Table
                    $('.test').DataTable();  
                }//open end 
            });//dialog end 
        });//onlick event for coopTable end
        
        
        //ONLICK FUNCTIONALITY for employmentTable
        $('#employmentTable').on('click', function(){
            $('<div class="employmentTableDialog"></div>').dialog({
                modal: true,
                title:`${json.employmentTable.title}`,
                width: 1000,
                hide: "explode",
                height: 700,
                open: function(){               
                    let $t = $(`
                        <table id="datatableEmployment" class="display">
                            <thead>
                                <tr>
                                    <th>Degree</th>
                                    <th>Employer</th>
                                    <th>Location</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody id="employmentTableBody">
                            </tbody>
                        </table>
                    `);
                    //Apend the DataTable structure to the dialog windows
                    $('.employmentTableDialog').append($t);
                    
                    //Extract the table data for the DataTable
                    $.each(json.employmentTable.professionalEmploymentInformation, function(index, item){
                        let $employmentData = $(`
                            <tr>
                                <td>${item.degree}</td>
                                <td>${item.employer}</td>
                                <td>${item.city}</td>
                                <td>${item.title}</td>
                                <td>${item.startDate}</td>
                            </tr>
                        `);
                        //Append the data to the table's body
                        $('#employmentTableBody').append($employmentData);
                    });
                    //After appending activate the Employment Data Table
                    $('#datatableEmployment').DataTable();
                }//open end 
            });//dialog end 
        });//onlick event for employmentTable end         
});//getData for CoopTable end



/**
 * RESEARCH/ BY INTEREST AREA
 * The Fetcher.getData() method is called to get the data from the '/research/byInterestArea' section of the API
 * After the initial append, which will contain an ul element, each 'areaName' item will be in the form of a div appended to it
 * Every $interestDiv is clickable - opens a dialog window which will hold all the publications for that particular area of Interest
 */
Fetcher.getData('/research/byInterestArea')
    .done(function (json){
        let $ul = $(`
            <h2 class="interest-headerText">Faculty Research: Areas of Interest</h2>
            <p class="interest-headerText">Click the area you’re interested in to explore our faculty publications</p>
            <ul class="row" id="interestResearchList"> 
            </ul>
        `);   
        //Append the header, p, and the ul list for the $interestDivs
        $('#interests-section').append($ul);
        
        //Create a div for each InterestArea
        $.each(json.byInterestArea, function(index,item){
            let $interestDiv = $(`
                <li id="interestItem-${index}" class="col-md-2 col-xs-4 researchInterest-item">
                    <div id="interestItem-${index}-inner" class="interestItem-text">
                        <h5 id="interestItem-${index}-header">${item.areaName}</h5>
                    </div>
                </li>
            `);
            //Append the $interestDiv to the ul list #interestResearchList'
            $('#interestResearchList').append($interestDiv);
            
            //Functionality for the $interestDiv - opens a dialog window which holds all the publications for that particular interest area
            $($interestDiv).on('click', function(){
                $('<div class="interestDialog"></div>').dialog({
                    modal: true,
                    title:`${item.areaName} Publications`,
                    width: 1000,
                    hide: 'explode',
                    height: 700,
                    open: function(){               
                        $.each(item.citations, function(index2,item2){
                            let $newCitation = $(`
                                <p><li>${item2}</li></p>
                            `);
                            //Append the publication to the dialog window
                            $(".interestDialog").append($newCitation);
                        });    
                    }//open end    
                });//dialog end
            });//onclick end
        });//.each end
        
        //Inserting Visual Icons for each interestItem in the interestResearchList
        //Only for visual flair
        $('#interestItem-0-header').before($(`<i class="fas fas fa-chart-bar"></i>`));
        $('#interestItem-1-header').before($(`<i class="fas fas fa-user-graduate"></i>`));
        $('#interestItem-2-header').before($(`<i class="fas fas fa-globe"></i>`)); 
        $('#interestItem-3-header').before($(`<i class="fas fas fa-database"></i>`));
        $('#interestItem-4-header').before($(`<i class="fas fas fa-chart-line"></i>`));
        $('#interestItem-5-header').before($(`<i class="fas fas fa-wifi"></i>`));
        $('#interestItem-6-header').before($(`<i class="fas fas fa-network-wired"></i>`));
        $('#interestItem-7-header').before($(`<i class="fas fas fa-mobile-alt"></i>`));
        $('#interestItem-9-header').before($(`<i class="fas fas fa-code"></i>`));
        $('#interestItem-8-header').before($(`<i class="fas fas fa-heartbeat"></i>`));
        $('#interestItem-10-header').before($(`<i class="fas fas fa-server"></i>`));
        $('#interestItem-11-header').before($(`<i class="fas fas fa-hdd"></i>`));
});//end of research byInterestArea fetch

/**
 * PEOPLE - FACULTY & STAFF, RESEARCH - byFaculty
 * The Fetcher.getData() method is called to get the data from the '/people' section of the API
 * The 'people' content which contains the faculty and staff for the IST Department is structrued in an accordion, which is created and appended to the '#facultyResearch-section'
 * The .accordion() plugin is used to manage the accordion
 * The accordion has two section: Faculty, Staff
 * Through the usage of $.each, the faculty and staff are placed in their respective sections of the accordion
 * Each div of each faculty and staff can be clicked on, which will open a .dialog window
 * The .dialog window will contain the data for that particular faculty and staff
 * Additionally, for the faculty Fetcher.getData() method is called to retrieve the data from '/research/byFaculty' which contains the research publications for each faculty
 * If the faculty has any publication (citations) that data will also be displayed in the .dialog window beneath the other data
 * The research publications part will be empty, if the faculty does not have any research publications, and the API does not have that data
 */
Fetcher.getData('/people')
    .done(function (json){
        
        //The $accordion
        let $accordion = $(`
            <h2 class="text-align-center">${json.title}</h2>
            <p class="text-align-center accordion-subtitle">${json.subTitle}</p>
            <div id="accordion">
                <h3>Faculty</h3>
                <div id="facultyList" class="row">
               
                </div>
                <h3>Staff</h3>
                <div id="staffList" class="row">
                    <p>
    
                    </p>
                </div>
            </div>
        `);
        //Appedning the accordion to its section
        $('#facultyResearch-section').append($accordion);
        //Activating the .accordion
        $('#accordion').accordion({
            heightStyle: "content"
        });
        $('#accordion').accordion({navigation: true});
        
        //Filling out the accordion section for the faculty with the faculty members
        $.each(json.faculty, function (index,item){
            let $facultyDiv = $(`
                <div class="facultyDiv peopleDiv col">
                    <div class="facultyImg-container">
                        <img class="img-fluid faculty-img img-thumbnail" src='${item.imagePath}'>
                    </div>
                    <div>
                        <p class="peopleName">${item.name}</p>
                    </div>
                </div>
            `);
            //Append $facultyDiv to the accordion section faculty
            $('#facultyList').append($facultyDiv);
            
            $facultyDiv.on('click', function(){
                $('<div class="facultyDialog"></div>').dialog({
                    modal: true,
                    title:`${item.name}`,
                    width: 800,
                    height: 600,
                    hide: 'explode',
                    open: function(){
                        let $dialogBox = $(`
                            <div class="row">
                                <div class="col faculty-popUpImg">
                                    <img class="img-fluid" src=${item.imagePath}>
                                <div>
                                <div class="col">
                                    <p>${item.title}</p>
                                    <p>Username: ${item.username}</p>
                                    <p>Office: ${item.office}</p>
                                    <p>Phone: ${item.phone}</p>
                                    <p>Email: ${item.email}</p>
                                </div>
                                <h3 class="text-align-center researcPublications-header">Research Publicatons</h3>
                                <hr>
                            <div>     
                        `);//dialogBox end
                        $('.facultyDialog').append($dialogBox);
                        
                        //Method call for the Fetcher.getData - retrieves the research done by the faculty
                        Fetcher.getData('/research/byFaculty')
                            .done(function (jsonResearch){
                                $.each(jsonResearch.byFaculty, function (k, research){
                                    //Check if the faculty has made any research publications
                                    if(item.username === research.username){
                                        //If the faculty has made any publications, go through the citations of the json, and retrive that data
                                        $.each(research.citations, function (m, citation){
                                            //Each citation for the particular faculty will be appended to the dialog window
                                            let $citations = $(`
                                                <li class="citation">${citation}</li>
                                            `);
                                            //Appending to the dialog window
                                            $('.facultyDialog').append($citations);
                                        });//each end
                                    }//if statement end
                                });//each end
                        });//fetching research byFaculty data end
                    }//open end
                });//dialog end
            });//onclick for facultyDiv end
        });//$.each end for faculty
        
        //Filling out the accordion section for the staff with the staff members
        $.each(json.staff, function (index,item){
            let $staffDiv = $(`
                <div class="staffDiv peopleDiv col">
                    <div class="staffImg-container">
                        <img class="img-fluid staff-img img-thumbnail" src='${item.imagePath}'>
                    </div>
                    <div>
                        <p class="peopleName">${item.name}</p>
                    </div>
                </div>
            `);
            //Append the staffList section of the accordion
            $('#staffList').append($staffDiv);
            
            //Onclick functionality for each staff member, in the form of a dialog window
            $staffDiv.on('click', function(){
               $('<div class="staffDialog"></div>').dialog({
                   modal: true,
                   hide: 'explode',
                   title: `${item.name}`,
                   width: 800,
                   height: 600,
                   open: function(){
                        let $dialogBox = $(`
                                <div class="row">
                                    <div class="col staff-popUp">
                                        <img class="img-fluid peopleDialog-img" src=${item.imagePath}>
                                        <p>${item.title}</p>
                                        <p>Username: ${item.username}</p>
                                        <p>Phone: ${item.phone}</p>
                                        <p>Office: ${item.office}</p>
                                        <p>Email: ${item.email}</p>
                                        <p>Website: <a href="${item.website}" class="people-link">${item.website}</a></p>
                                    <div>
                                </div>                
                        `);
                        //Appending to the dialog window
                        $('.staffDialog').append($dialogBox);
                   }//open end
               });//dialog end
            });//onlclick for $staffDiv end
        });//each end
});//getData for people end


/**
* STUDENT RESOURCES/STUDENTS
* The Fetcher.getData() method is called to get the data from the '/resources' section of the API
* The student resources are styled and appended in the form of a clickable image gallery
* Each image/div can be clicked on, which will open up a dialog window that holds the data for that particular resource
* This code section is a bit lengthy, due to a lot of repetition, as it was created very early during this project's development where my understanding of jQuery was lower
* Using $.each would have shortened this process at that time
*/
Fetcher.getData('/resources')
    .done(function (json){
        let $main = $(`
            <div id="studentResources-header">
                <h2 class="text-align-center">${json.title}</h2>
                <p class="text-align-center">${json.subTitle}</p>
            </div>
        `);
        
        //Append the header & subtitle to the student section
        $('#studentResources-section').append($main);
        
        //The image gallery - each div will have a 'p' and 'img element' to it, as well as being a 'col' within a 'row'
        let $imageGallery = $(`
            <div id="resources-galleryView">
                <div class="row">
                    <div id="coopEnrollment" class="col">
                        <img class="galleryImg" src="../media/Students_Working.png" alt="Students Working">
                        <p class="galleryLabel">${json.coopEnrollment.title}</p>
                    </div>
                    <div id="forms" class="col">
                        <img class="galleryImg" src="../media/Forms.jpg" alt="Forms Image">
                        <p class="galleryLabel">Forms</p>
                    </div>
                    <div id="studentAmbassadors" class="col">
                        <img class="galleryImg" src="../media/Ambassadors.jpg" alt="Student Ambassadors">
                        <p class="galleryLabel">${json.studentAmbassadors.title}</p>
                        </img>
                    </div>
                </div>
                <div class="row">
                    <div id="tutorsAndLabInformation" class="col">
                        <img class="galleryImg" src="../media/Tutoring.jpg" alt="tutorsAndLabInformation">
                        <p class="galleryLabel">${json.tutorsAndLabInformation.title}</p>
                    </div>
                    <div id="studentServices" class="col">
                        <img class="galleryImg" src="../media/Student_Services.jpg" alt="Student Services">
                        <p class="galleryLabel">Student Services</p>
                    </div>
                    <div id="studyAbroad" class="col">
                        <img class="galleryImg" src="../media/Study_Abroad.jpg" alt="Image of Dubrovnik">
                        <p class="galleryLabel">${json.studyAbroad.title}</p>
                    </div>
                </div>
            </div>
        `);
        
        //Append Current Students Gallery to the section
        $('#studentResources-section').append($imageGallery);
        
        //CLICK FUNCTIONALITY FOR CURRENT STUDENTS GALLERY
        //Coop-Enrollment onclick - opens the dialog window with the content
        $('#coopEnrollment').on('click', function(){
            $('<div></div>').dialog({
                modal: true,
                title:`${json.coopEnrollment.title}`,
                width: 1000,
                hide: 'fold',
                height: 800,
                open: function(){
                    let $dialogBoxContent = $(`
                            <div class="resources-dialog-text">
                                <h3>${json.coopEnrollment.enrollmentInformationContent[0].title}</h3>
                                <p>${json.coopEnrollment.enrollmentInformationContent[0].description}</p>
                            </div>
                            <div class="resources-dialog-text">
                                <h3>${json.coopEnrollment.enrollmentInformationContent[1].title}</h3>
                                <p>${json.coopEnrollment.enrollmentInformationContent[1].description}</p>
                            </div>
                            <div class="resources-dialog-text">
                                <h3>${json.coopEnrollment.enrollmentInformationContent[2].title}</h3>
                                <p>${json.coopEnrollment.enrollmentInformationContent[2].description}</p>
                            </div>
                            <div class="resources-dialog-text">
                                <h3>${json.coopEnrollment.enrollmentInformationContent[3].title}</h3>
                                <p>${json.coopEnrollment.enrollmentInformationContent[3].description}</p>
                            </div>
                            <p><a href="${json.coopEnrollment.RITJobZoneGuidelink}">${json.coopEnrollment.RITJobZoneGuidelink}</a></p>
                        `);
                        $(this).append($dialogBoxContent);
                      }
                });//dialog box end
        });//studyAbroad functionality end
        
        //Student Ambassadors onclick - opens the dialog window with the content
        $('#studentAmbassadors').on('click', function(){
            $('<div></div>').dialog({
                modal: true,
                title:`${json.studentAmbassadors.title}`,
                width: 1000,
                hide: 'fold',
                height: 800,
                open: function(){
                    let $dialogBoxContent = $(`
                            <div class="resources-dialog-text>
                                <img class="img-fluid studyAbroad-img" src="${json.studentAmbassadors.ambassadorsImageSource}" alt="${json.studentAmbassadors.title}">
                                <img class="img-fluid studyAbroad-img"  src="${json.studentAmbassadors.ambassadorsImageSource}"/>
                                <h3>${json.studentAmbassadors.subSectionContent[0].title}</h3>
                                <p>${json.studentAmbassadors.subSectionContent[0].description}</p>
                            </div>
                            <div class="resources-dialog-text>
                                <h3>${json.studentAmbassadors.subSectionContent[1].title}</h3>
                                <p>${json.studentAmbassadors.subSectionContent[1].description}</p>
                            </div>
                            <div class="resources-dialog-text>
                                <h3>${json.studentAmbassadors.subSectionContent[2].title}</h3>
                                <p>${json.studentAmbassadors.subSectionContent[2].description}</p>
                            </div>
                            <div class="resources-dialog-text>
                                <h3>${json.studentAmbassadors.subSectionContent[3].title}</h3>
                                <p>${json.studentAmbassadors.subSectionContent[3].description}</p>
                            </div>
                            <div class="resources-dialog-text>
                                <h3>${json.studentAmbassadors.subSectionContent[4].title}</h3>
                                <p>${json.studentAmbassadors.subSectionContent[4].description}</p>
                            </div>
                            <div class="resources-dialog-text>
                                <h3>${json.studentAmbassadors.subSectionContent[5].title}</h3>
                                <p>${json.studentAmbassadors.subSectionContent[5].description}</p>
                            </div>
                            <div class="resources-dialog-text>
                                <h3>${json.studentAmbassadors.subSectionContent[6].title}</h3>
                                <p>${json.studentAmbassadors.subSectionContent[6].description}</p>
                                <a href="${json.studentAmbassadors.applicationFormLink}">${json.studentAmbassadors.applicationFormLink}</a>
                                <p><small>${json.studentAmbassadors.note}</small></p>
                            </div>
                        `);
                        $(this).append($dialogBoxContent);
                      }
                });//dialog box end
        });//student Ambassadors functionality end
        
        //Forms onclick - - opens the dialog window with the content
        $('#forms').on('click', function(){
            $('<div></div>').dialog({
                modal: true,
                title:'Forms',
                width: 400,
                hide: 'fold',
                height: 450,
                open: function(){
                    let $dialogBoxContent = $(`
                        <div class="formsListing">
                            <h3>Graduate Forms</h3>
                            <ul>
                                <li><a href="https://ist.rit.edu/${json.forms.graduateForms[0].href}">${json.forms.graduateForms[0].formName}</a></li>
                                <li><a href="https://ist.rit.edu/${json.forms.graduateForms[1].href}">${json.forms.graduateForms[1].formName}</a></li>
                                <li><a href="https://ist.rit.edu/${json.forms.graduateForms[2].href}">${json.forms.graduateForms[2].formName}</a></li>
                                <li><a href="https://ist.rit.edu/${json.forms.graduateForms[3].href}">${json.forms.graduateForms[3].formName}</a></li>
                                <li><a href="https://ist.rit.edu/${json.forms.graduateForms[5].href}">${json.forms.graduateForms[5].formName}</a></li>
                                <li><a href="https://ist.rit.edu/${json.forms.graduateForms[6].href}">${json.forms.graduateForms[6].formName}</a></li>
                            </ul>
                            <h3>Undergraduate Forms</h3>
                            <ul>
                                <li><a href="https://ist.rit.edu/${json.forms.undergraduateForms[0].href}">${json.forms.undergraduateForms[0].formName}</a></li>
                            </ul>
                        </div>
                    `);
                    //Append to the dialog window
                    $(this).append($dialogBoxContent);
                }//open end
            });//dialog box end
        });//forms functionality end
        
        //Tutors/Lab Information onclick - opens the dialog window with the content
        $('#tutorsAndLabInformation').on('click', function(){
            $('<div></div>').dialog({
                modal: true,
                title:`${json.tutorsAndLabInformation.title}`,
                width: 700,
                hide: 'fold',
                height: 400,
                open: function(){
                    let $dialogBoxContent = $(`
                            <div>
                                <p>${json.tutorsAndLabInformation.description}</p>
                                <p class="margin-top-50px"><a href="${json.tutorsAndLabInformation.tutoringLabHoursLink}">${json.tutorsAndLabInformation.tutoringLabHoursLink}</a></p>
                            </div>
                        `);
                        //Append to the dialog window
                        $(this).append($dialogBoxContent);
                      }
                });//dialog box end
        });//Tutors/Lab Information functionality end
        
        //STUDYABROAD onclick - opens the dialog window with the content
        $('#studyAbroad').on('click', function(){
            $('<div></div>').dialog({
                modal: true,
                title:`${json.studyAbroad.title}`,
                width: 1000,
                hide: 'fold',
                height: 800,
                open: function(){
                    let $dialogBoxContent = $(`
                        <p class="justify-content resources-dialog-text">${json.studyAbroad.description}</p>
                        <div class="resources-dialog-text text-align-center">
                            <h3 class="text-align-center">${json.studyAbroad.places[0].nameOfPlace}</h3>
                            <img class="img-fluid studyAbroad-img" src="../media/Study_Abroad.jpg" alt="Dubrovnik">
                            <p>${json.studyAbroad.places[0].description}</p>
                        </div>
                        <div class="resources-dialog-text text-align-center">
                            <h3 class="text-align-center">${json.studyAbroad.places[1].nameOfPlace}</h3>
                            <img class="img-fluid studyAbroad-img" src="../media/Dubai.jpg" alt="Dubai">
                            <p>${json.studyAbroad.places[1].description}</p>
                        </div>
                    `);//$dialogBoxContent end
                    //Append to the dialog window
                    $(this).append($dialogBoxContent);
                }//open end
            });//dialog box end
        });//studyAbroad functionality end
  
  
        //Student Services onclick - opens the dialog window with the content
        $('#studentServices').on('click', function(){
            $('<div></div>').dialog({
                modal: true,
                title: "Student Services",
                width: 1000,
                hide: 'fold',
                height: 520,
                open: function(){
                    let $dialogBoxContent = $(`
                        <div class="resources-dialog-text">
                            <h3>${json.studentServices.title}</h3>
                            <div>
                                <br />
                                <h4>${json.studentServices.academicAdvisors.title}</h4>
                                <p>${json.studentServices.academicAdvisors.description}</p>
                                <br />
                                <h4>${json.studentServices.academicAdvisors.faq.title}<h4>
                                <p><a href="${json.studentServices.academicAdvisors.faq.contentHref}">${json.studentServices.academicAdvisors.faq.contentHref}</a></p>
                            </div>
                        </div>
                    `);
                    //Append to the dialog window
                    $(this).append($dialogBoxContent);
                }//open end
            });//dialog box end
        });//student Services functionality end 
});//done student resources

/**
 * FOOTER
 * The Fetcher.getData() method is called to get the data from the '/footer' section of the API
 * The data is appended to the 'footer' of the index.html
 * The 'footer' holds all the additional links, such as the useful links and social links for the IST department
 * A lot of these links are dead by now, and some of them lead to dead sites
 */
Fetcher.getData('/footer')
    .done(function (json){
        
        //Hold the useful links
        let link0;
        let link1;
        let link2;
        let link3;
        
        //Map out the quicklinks and retrive each useful link from it
        $.map(json.quickLinks, function(item, index){
            //console.log(item.title);
            if (index === 0){
                link0 = item;
            }   
            else if(index ===1){
                link1 = item;
            }
                
            else if(index ===2){
                link2 = item;
            }
                
            else if(index ===3){
                link3 = item; 
            }    
        });//map end

        //Append to footer the retrieved data, as well as additional stuff
        $('footer').append(`
            <div class="row">
                <div class="col">
                    <h3>Useful Links</h3>
                    <p class="useful-links-p"><a class="useful-links-a"  href="${link0.href}">${link0.title}</a></p>
                    <p class="useful-links-p"><a class="useful-links-a"  href="${link1.href}">${link1.title}</a></p>
                    <p class="useful-links-p"><a class="useful-links-a"  href="${link2.href}">${link2.title}</a></p>
                    <p class="useful-links-p"><a class="useful-links-a"  href="${link3.href}">${link3.title}</a></p>
                </div>
                <div class="col">
                    <h3>${json.copyright.title}</h3>
                    <p>© 2021. Filipa Ivanković</p>
                    ${json.copyright.html}
                </div>
                <div class="col">
                    <h3>${json.social.title}</h3>
                    <p>${json.social.tweet}</p>
                    <small>${json.social.by}</small>
                    <div id="socialIcons-container">
                        <a class="" href='${json.social.twitter}'><img class="img-fluid social-Icons" src="../media/Twitter.png" alt="Twitter Icon"></a>
                        <a class="" href='${json.social.facebook}'><img class="img-fluid social-Icons" src="../media/Facebook.webp" alt="Facebook Icon"></a>
                    </div>
                </div>
            </div>
        `);//append end
});//Footer end