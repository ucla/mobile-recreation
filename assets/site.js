var Site = new function(){
    
    this.Config = {
        // Endpoint for RSS must be same-origin to support XHR request
        'endpoint':'http://localhost/m.recreation.ucla.edu/example'
    }
            
    this.Util = {
        '$create': function(ele){
            return $(document.createElement(ele));
        }
    }
            
    this.retrieveRemote = function(endpoint, dataType, options){
        
        $.ajax({
            url: endpoint,
            dataType: dataType,
            success: function(data) {
                data = options.process(data);
                if(Modernizr.localstorage){
                    localStorage.setItem(endpoint, JSON.stringify(data));
                }
                if(typeof options.success != 'undefined')
                    options.success(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
                var data = null;
                if(Modernizr.localstorage){
                    data = localStorage.getItem(endpoint)
                }
                if(data){
                    if(typeof options.success != 'undefined')
                        options.success(JSON.parse(data));
                }else{
                    if(typeof options.success != 'undefined')
                        options.error(errorThrown);
                }
            }
        });
        
    }
            
    this.retrieve = function(endpoint, dataType, options){
        
        if(options.prefer && options.prefer == 'cache' && Modernizr.localstorage){
            var data = localStorage.getItem(endpoint);
            if(data){
                options.success(JSON.parse(data));
                this.retrieveRemote(endpoint, dataType, {
                    'process': options['process']
                });
                return;
            }
        }
        
        this.retrieveRemote(endpoint, dataType, options);
    }
    
    this.News = {
        
        'retrieve':  function(endpoint, title, options){

            var $create = Site.Util.$create, 
                $main = $('main').html('');

            $create('div').addClass('content')
                          .append($create('h1').text('Loading'))
                          .append($create('div').text('Please wait...').attr('style','text-align:center'))
                          .appendTo($main);

            Site.retrieve(endpoint, 'xml', {
                'prefer': options.prefer,
                'process': function(data){
                    var items = {};
                    $(data).find("item").each(function(){
                        var $this = $(this)
                        items[$this.find("guid").text()] = {
                            "title": $this.find("title").text(),
                            "link": $this.find("link").text(),
                            "description": $this.find("description").text(),
                            "dc:subject": $this.find("dc:subject").text(),
                            "dc:date": $this.find("dc:date").text()
                        };
                    })
                    return items;
                },
                'success': function(data){
                    $main.html('');
                    options.success(data);
                }, 
                'error': function(error){
                    $main.html('');
                    $create('div').addClass('content')
                                  .append($create('h1').text('Not Available'))
                                  .append($create('div').text(title+' could not be retrieved. Either your device is not connected to the internet or the server is down.'))
                                  .appendTo($main);
                    options.error(error);
                }
            })
        }
        
    }
}