(function($) {
  var projectInfos = {};
  var selectedProject = null;


  function getFirstInRow(itm){
    var itmTop = itm.position().top;

    function getPreviousTop() {
      if (!itm.prev().length) {
        return itm;
      }
      if (itm.prev().position().top < itmTop) {
        return itm.prev();
      }
      itm = itm.prev();
      return getPreviousTop();
    }

    itm = getPreviousTop(itm);
    return itm;

  }



  function getLastInRow(itm) {
    var itmTop = itm.position().top;
    function getNextTop() {
      if (!itm.next().length) {
        // if(itm.position().top === itmTop){
        //   return getFirstInRow(itm);
        // }

        return itm;
      }
      if (itm.next().position().top > itmTop) {
        return itm;
      }
      itm = itm.next();
      return getNextTop();
    }
    itm = getNextTop(itm);
    return itm;
  }

  $('#client-list .client-logo').each(function(i, itm) {
    var el = $(itm);
    projectInfos[el.attr('href')] = el.siblings('.project-info').detach();
    el.on('click', function(evt) {
      var elpos = el.parent().position();
      var last = getLastInRow(el.parent());

      $('#client-list .client-logo.selected').removeClass('selected');
      
      if (selectedProject) {
          selectedProject.hide().detach();
        if (selectedProject !== projectInfos[el.attr('href')]) {
          el.addClass('selected');
          selectedProject = projectInfos[el.attr('href')];
          selectedProject.insertAfter(last).toggle();
        } else {
          selectedProject = null;
        }
      } else {
        selectedProject = projectInfos[el.attr('href')];
        selectedProject.insertAfter(last).toggle();
        el.addClass('selected');
      }


      // 

      evt.preventDefault();
    });

  });

})(jQuery);