/*jslint browser:true node:true indent:4 */
/*global $*/

//document.addEventListener('DOMContentLoaded', function () {})

$(function () {
    
    var startmouseX,
        startmouseY,
        endmouseX,
        endmouseY,
        click = false,
        sec = document.getElementById('sec'),
        context = sec.getContext('2d');
        var firstclic = true;
        

    $('#sec').mousedown(function (e) {
        click = true;
        if (firstclic === true) {

        startmouseX = e.pageX - this.offsetLeft;
        startmouseY = e.pageY - this.offsetTop;
       
        firstclic = false;
        console.log(firstclic);}
        else{
        endmouseX = e.pageX - this.offsetLeft;
        endmouseY = e.pageY - this.offsetTop;
        firstclic = true;
        console.log(firstclic);
        }
       
    });

    $('#sec').mousemove(function (e) {
        if (click === true) {
            if ($('#outil').val() === "pinceaux") {
                sec.style.cursor = "url(brush.cur), pointer";
                context.beginPath();
                context.strokeStyle = $('#color').val();
                context.lineWidth = $('#width').val();
                context.lineJoin = "round";
               
                context.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                context.lineTo(e.pageX - this.offsetLeft + 1, e.pageY - this.offsetTop + 1);
                context.closePath();
                context.stroke();
            }
            if ($('#outil').val() === "gomme") {
                sec.style.cursor = "url(Eraser.cur), pointer";
                context.beginPath();
                context.strokeStyle = "white";
                context.lineWidth = $('#width').val();
                context.lineJoin = "round";
               
                context.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                context.lineTo(e.pageX - this.offsetLeft + 1, e.pageY - this.offsetTop + 1);
                context.closePath();
                context.stroke();
            }
        }
    });
    $('#sec').mouseleave(function () {
        click = false;
    });

    $('#sec').mouseup(function (e) {
        click = false;
    if (firstclic === true) {
        


        

        if ($('#outil').val() === "traits") {
            sec.style.cursor = "url(trait.cur), pointer";
            context.beginPath();
            context.strokeStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
          
            context.moveTo(startmouseX, startmouseY);
            context.lineTo(endmouseX, endmouseY);
            context.closePath();
            context.stroke();
        

      

        }
        if ($('#outil').val() === "rectangle") {
            sec.style.cursor = "url(rect.cur), pointer";
            context.beginPath();
            context.strokeStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
           context.closePath();
            context.rect(startmouseX, startmouseY, endmouseX - startmouseX, endmouseY - startmouseY);
            context.stroke();
        }
        if ($('#outil').val() === "rectangleP") {
            sec.style.cursor = "url(rectfill.cur), pointer";
            context.beginPath();
            context.fillStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
          context.closePath();
            context.fillRect(startmouseX, startmouseY, endmouseX - startmouseX, endmouseY - startmouseY);
            context.stroke();
        }
        if ($('#outil').val() === "circle") {
            sec.style.cursor = "url(ns.cur), pointer";
            context.beginPath();
            context.strokeStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
            context.closePath();
            context.arc(startmouseX, startmouseY, Math.sqrt(((endmouseX - startmouseX) * (endmouseX - startmouseX)) + ((endmouseY - startmouseY) * (endmouseY - startmouseY))), 0, 2 * Math.PI);
            context.stroke();
        }
        if ($('#outil').val() === "circle full") {
            context.beginPath();
            context.fillStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
           context.closePath();
            context.arc(startmouseX, startmouseY, Math.sqrt(((endmouseX - startmouseX) * (endmouseX - startmouseX)) + ((endmouseY - startmouseY) * (endmouseY - startmouseY))), 0, 2 * Math.PI);
            context.fill();
        }
    }
    });

    $('#clear').click(function () {
        context.clearRect(0, 0, sec.width, sec.height);
        firstclic = true;
    });


        $('#save').click(function(){
            var canvas = document.getElementById('sec');
            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            window.location.href=image; 
    });

        $("#file_input").change(function(e){


    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.src = url;


    img.onload = function() {

            var img_width = img.width,
             img_height = img.height;

            context.drawImage(img, 200, 200, img_width, img_height);

        }
    });

        $("#mood").click(function(){
            var bouton = document.getElementById('mood');
            var text = document.getElementById('texte');
            var img = document.getElementById('img');
            if (text.innerHTML === "Aujourd'hui vous êtes content!") {
             bouton.textContent = "Mais si je suis content!";
                $("#img").attr('src','sad2.png');
                text.textContent = "Aujourd'hui vous n'êtes pas content...";
            }
            else{
                text.textContent = "Aujourd'hui vous êtes content!";
                bouton.textContent = "Non, pas content !";
                $("#img").attr('src','content.png');

            }
       
        });

        $('outil').click(function(){
            if ($('#outil').val() === "traits"){
                sec.style.cursor = "url(trait.cur), pointer";
            }
        });

            

});



