import {makeStyles} from '@material-ui/core';


export default makeStyles(() => ({

    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      homeContainer: {
        display: 'flex',
        flexDirection: 'row',
      },
      paper: {
        height: 140,
        width: 100,
      },
      heading: {
        color: 'purple',
      },
      image: {
        marginLeft: '25px',
      },
}));