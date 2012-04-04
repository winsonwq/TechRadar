View.Operation = {};

View.Operation.Export = (function() {
  function Export() {
    this.el = $('#export');
  }

  Export.prototype = {
  };

  return Export;
})();

View.Operation.AddPoint = (function() {
  function get_new_point_name(name) {
    function generate_name() {
      return name + '(' + duplicated_number + ')';
    }

    if (!points.is_contain(name)) return name;
    var duplicated_number = 1;

    while (points.is_contain(generate_name(name))) {
      duplicated_number++;
    }
    return generate_name(name);
  }

  function AddPoint() {
    this.el = $('#add-point');
    this.initialize();
  }

  AddPoint.prototype = {
    initialize: function() {
      this.el.on('mousedown', function(event) {
        event.preventDefault();

        var point = new Presenter.Point();
        point.set_name(get_new_point_name(point.get_name()));

        points.add(point);

        dragging.set_current_point(point);
        dragging.set_coordinate(event);
      });
    }
  };

  return AddPoint;
})();

View.Operation.Save = (function() {
  function Save() {
    this.el = $('#save');
    this.initialize();
  }

  Save.prototype = {
    initialize: function() {
      this.el.on('click', function() {
        var connection = new Connection();
        connection.save(points.toJSON());
      });
    }
  };

  return Save;
})();