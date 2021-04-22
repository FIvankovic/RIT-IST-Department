/**
 * Fetcher class
 * The Fetcher class is responsible for fetching all the data from RIT API
 * The getData() function is used throughout the app.js to make the calls to the API, so the extracted data can be edited, styled and appended to the main index.html page
 * 
 * @author Filipa Ivankovic
 */
export class Fetcher {
    
    /**
     * getData() function
     * This function retrieves the data from the RIT IST API
     * The retrieval is done with the help of the proxy.php file
     * Before sending the retrieval request the '#loader' div from the index.html is shown as a loader to tell the user that data retrieval is in process
     * After data retrieval is finished, the loader div is removed and the rest of the page is made visible
     * @param {type} resourcePath
     * @return {Fetcher.getData.jqXHR}
     */
    static getData(resourcePath) {
        let jqXHR = $.ajax({
            method: 'GET',
            dataType: 'json',
            data: {path: resourcePath},
            cache: false,
            async: true,
            url: 'proxy.php',
            beforeSend: function () {
                //Loader content
                let $loaderContent = $(`
                    <p class="col" id="loader-text">Loading: ${resourcePath}</p>
                    <img class="img-fluid loader-gif" src="media/loading.gif">
                `);
                //Append the .gif and text to the loader
                $('#loader').append($loaderContent);
            }
        }).always(function () {
            //Remove the loader
            $('#loader').remove();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //Print the error just in case of one
            console.log('ERROR while processing request: ');
            console.log(jqXHR);
        });

        return jqXHR;
    }//getData method end   
}//Fetcher class end


