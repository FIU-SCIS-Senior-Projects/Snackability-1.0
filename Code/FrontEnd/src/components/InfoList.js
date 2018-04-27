import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import InfoListtItem from './InfoListItem';

class InfoList extends Component {
  
  componentWillMount(){
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
    });

    this.dataSource = ds.cloneWithRows(this.props.members);
}

  renderRow(members) {
    return <InfoListtItem members={members} />;
  }

  render() {
    return (
      <ListView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  return { members: state.members };
};

export default connect(mapStateToProps)(InfoList);
