/*jslint browser:true node:true indent:4 */
/*global $*/

//document.addEventListener('DOMContentLoaded', function () {})

$(function () {
    "use strict";
    var startmouseX,
        startmouseY,
        endmouseX,
        endmouseY,
        click = false,
        sec = document.getElementById('sec'),
        context = sec.getContext('2d');

    $('#sec').mousedown(function (e) {
        startmouseX = e.pageX - this.offsetLeft;
        startmouseY = e.pageY - this.offsetTop;
        click = true;
    });

    $('#sec').mousemove(function (e) {
        if (click) {
            if ($('#outil').val() === "pinceau") {
                context.beginPath();
                context.strokeStyle = $('#color').val();
                context.lineWidth = $('#width').val();
                context.lineJoin = "round";
                if ($('#shadow')[0].checked === true) {
                    context.shadowBlur = $('#shadowPath').val();
                    context.shadowColor = "black";
                } else if ($('#shadow')[0].checked === false) {
                    context.shadowBlur = 0;
                    context.shadowColor = "white";
                }
                context.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                context.lineTo(e.pageX - this.offsetLeft + 1, e.pageY - this.offsetTop + 1);
                context.closePath();
                context.stroke();
            }
            if ($('#outil').val() === "gomme") {
                context.beginPath();
                context.strokeStyle = "white";
                context.lineWidth = $('#width').val();
                context.lineJoin = "round";
                if ($('#shadow')[0].checked === true) {
                    context.shadowBlur = 0;
                    context.shadowColor = "white";
                }
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
        endmouseX = e.pageX - this.offsetLeft;
        endmouseY = e.pageY - this.offsetTop;
        click = false;

        if ($('#outil').val() === "Ligne") {
            context.beginPath();
            context.strokeStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
            if ($('#shadow')[0].checked === true) {
                context.shadowBlur = $('#shadowPath').val();
                context.shadowColor = "black";
            } else if ($('#shadow')[0].checked === false) {
                context.shadowBlur = 0;
                context.shadowColor = "white";
            }
            context.moveTo(startmouseX, startmouseY);
            context.lineTo(endmouseX, endmouseY);
            context.closePath();
            context.stroke();
        }
        if ($('#outil').val() === "rectangle") {
            context.beginPath();
            context.strokeStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
            if ($('#shadow')[0].checked === true) {
                context.shadowBlur = $('#shadowPath').val();
                context.shadowColor = "black";
            } else if ($('#shadow')[0].checked === false) {
                context.shadowBlur = 0;
                context.shadowColor = "white";
            }
            context.rect(startmouseX, startmouseY, endmouseX - startmouseX, endmouseY - startmouseY);
            context.stroke();
        }
        if ($('#outil').val() === "rectanglePlein") {
            context.beginPath();
            context.fillStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
            if ($('#shadow')[0].checked === true) {
                context.shadowBlur = $('#shadowPath').val();
                context.shadowColor = "black";
            } else if ($('#shadow')[0].checked === false) {
                context.shadowBlur = 0;
                context.shadowColor = "white";
            }
            context.fillRect(startmouseX, startmouseY, endmouseX - startmouseX, endmouseY - startmouseY);
            context.stroke();
        }
        if ($('#outil').val() === "cercle") {
            context.beginPath();
            context.strokeStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
            if ($('#shadow')[0].checked === true) {
                context.shadowBlur = $('#shadowPath').val();
                context.shadowColor = "black";
            } else if ($('#shadow')[0].checked === false) {
                context.shadowBlur = 0;
                context.shadowColor = "white";
            }
            context.arc(startmouseX, startmouseY, Math.sqrt(((endmouseX - startmouseX) * (endmouseX - startmouseX)) + ((endmouseY - startmouseY) * (endmouseY - startmouseY))), 0, 2 * Math.PI);
            context.stroke();
        }
        if ($('#outil').val() === "cerclePlein") {
            context.beginPath();
            context.fillStyle = $('#color').val();
            context.lineWidth = $('#width').val();
            context.lineJoin = "round";
            if ($('#shadow')[0].checked === true) {
                context.shadowBlur = $('#shadowPath').val();
                context.shadowColor = "black";
            } else if ($('#shadow')[0].checked === false) {
                context.shadowBlur = 0;
                context.shadowColor = "white";
            }
            context.arc(startmouseX, startmouseY, Math.sqrt(((endmouseX - startmouseX) * (endmouseX - startmouseX)) + ((endmouseY - startmouseY) * (endmouseY - startmouseY))), 0, 2 * Math.PI);
            context.fill();
        }
        
    });


    $('#clear').click(function () {
        context.clearRect(0, 0, sec.width, sec.height);
    });
});

$('#save').click(function(){
            var canvas = document.getElementById('sec');
            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            window.location.href=image; // it will save locally
    });



$("#file_input").change(function(e){


    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.src = url;


    img.onload = function() {

           var  img_width = img.width;
            var img_height = img.height;

            context.drawImage(img, 0, 0, img_width, img_height);

    }


});
