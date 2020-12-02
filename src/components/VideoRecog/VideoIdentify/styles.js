import {makeStyles} from '@material-ui/core';


export default makeStyles(() => ({

    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },

      homeButton: {
        // position: 'absolute',
        // marginRight: '30px',
      },
      heading: {
        color: 'purple',
      },
      image: {
        marginLeft: '25px',
      },
}));