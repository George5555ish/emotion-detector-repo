import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({

    imgContainer: {
        padding: '0',
        margin: '0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    formContainer: {
     
      
        // position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      canvas: {
        // display: 'flex',
        // justifyContent: 'center',
        position: 'absolute',
        bottom: "15px",
        right: "35px"
    
        
      },
    canvas2: {
      // display: 'flex',
      // justifyContent: 'center',
      position: 'absolute'
    },
    
    notifDiv: {
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: 'sansSerif'
    }, 
   
    
    });