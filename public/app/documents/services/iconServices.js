'use strict';

myApp.factory('iconServices', function() {
  return{
        getIcon:function(id)
            {
                var ico="";
             switch(id)
             {
                case 1:
                    ico="images/documents/pdf.png";
                    break;
                case 2:    
                    ico="images/documents/word.png";
                    break;
                case 3:    
                    ico="images/documents/text.png";
                    break; 
                case 4:
                    ico="images/documents/image.PNG";
                    break;
                case 5:    
                    ico="images/documents/zip.png";
                    break;
                case 6:    
                    ico="images/documents/video.png";
                    break;
                default:    
                    ico="images/documents/all.png";
                    break;          
             }
             return ico;
            }
  };
});