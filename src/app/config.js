var React = require('react');
var createClass = require('create-react-class');
import LoginNavigation from './loinNavigation.js';
import ConfigSidebar from './layouts/configsidebar.js';
var Config = createClass({
    render: function(){
        return(
              <div className="row">
        <LoginNavigation />
          <div className="col-lg-2">
            <ConfigSidebar />
          </div>
          </div>
        );
    }
});

export default Config;