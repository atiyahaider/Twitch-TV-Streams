const StreamArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const BaseURL = 'https://wind-bow.glitch.me/twitch-api';

function getStreams() {
  //Get streaming info for each channel in the array
  for (let i=0; i<StreamArr.length; i++) {
     $.ajax({
        url: BaseURL + '/streams/' + StreamArr[i],
        method: 'GET'
      })
      .done(function(streamData) {
        //if channel if offline or not found, get the rest of the info from channels url
        if (streamData.stream === null) {
          getChannelInfo(StreamArr[i], 'Offline');
        }
        else if (streamData.stream === undefined) {
          getChannelInfo(StreamArr[i], 'Account Closed');
        } 
        else {
          displayChannel(streamData.stream.channel, streamData.stream.game + ': ' + streamData.stream.channel.status);
        }
      })
      .fail(function(xhr, status, error) {
         console.log('Failed to get data: ' + status);
      });
  }
}

function getChannelInfo(channel, status) {
       $.ajax({
        url: BaseURL + '/channels/' + channel,
        method: 'GET'
      })
      .done(function(channelData) {
        console.log(channelData);
        displayChannel(channelData, status);
      })
      .fail(function(xhr, status, error) {
         console.log('Failed to get data: ' + status);
      });
}

function displayChannel(data, status) {
  let statusClass = status === 'Offline' ? 'offline' : 'online';
  let html = '<a href="' + data.url + '" target="_blank"><div class="row text-left align-items-center channel ' + statusClass + '"><div class="col-xs-2 col-sm-1 icon"><img src="' + data.logo + '" width="35"></div><div class="col-xs-10 col-sm-3 name ">' + data.display_name + '</div><div class="col-xs-10 col-sm-8 status">' + status + '</div></div></a>';

  if (status === 'Offline') {
    $('#streamers').append(html);
  }
  else {
    $('#streamers').prepend(html);
    $('.status').addClass('smallFont');
  }
}

$(document).ready(function() {
  getStreams();
})

$('#all').on('click', function() {
  $('#all').addClass('active');
  $('#online, #offline').removeClass('active');
  $('.online, .offline').removeClass('d-none');
});

$('#online').click(function() {
  $('#online').addClass('active');
  $('#all, #offline').removeClass('active');
  $('.online').removeClass('d-none');
  $('.offline').addClass('d-none');
});

$('#offline').on('click', function() {
  $('#offline').addClass('active');
  $('#all, #online').removeClass('active');
  $('.online').addClass('d-none');
  $('.offline').removeClass('d-none');
});