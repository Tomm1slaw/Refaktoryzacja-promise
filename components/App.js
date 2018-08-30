var GIPHY_PUB_KEY = "dc6zaTOxFJmzC";
var GIPHY_API_URL = "https://api.giphy.com";

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function(gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

    getGif: function(searchingText, callback) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
    function httpGet(url) {
    return new Promise(
        function(resolve, reject) {
            const request = new XMLHttpRequest();
            request.onload = function() {
                if (this.status === 200) {
                    var data = JSON.parse(this.responseText).data;
                    resolve (JSON.parse(this.responseText).data); // Sukces
                } 
                else {
                    reject(new Error(this.statusText)); // Dostaliśmy odpowiedź, ale jest to np 404
                }
            };
            request.onerror = function() {
                reject(new Error(
                   `XMLHttpRequest Error: ${this.statusText}`));
            };
            request.open("GET", url);
            request.send();
        });
    }

    httpGet(url)
        .then(response => { 
                var gif = {
                    url: response.fixed_width_downsampled_url,
                    sourceUrl: response.url
                };
                callback(gif);
            })
        .catch(error => console.error('Something went wrong', error));
    },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return ( 
            <div style = {styles}>
            <h1>Wyszukiwarka GIFow!</h1>
            <p>
            Znajdź gifa na 
            <a href={'https://giphy.com'}>giphy</a>.Naciskaj enter, aby pobrać kolejne gify.</p>
            <Search onSearch = {this.handleSearch} /> 
            <Gif 
                loading = {this.state.loading} 
                url = {this.state.gif.url}
                sourceUrl = {this.state.gif.sourceUrl}
            />
            </div>
        );
    }
});