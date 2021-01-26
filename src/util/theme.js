export default {
  palette: {
    primary: {
      light: '#CCCFD3',
      main: '#FF6F16',
      dark: '#1C223A',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#262F50',
      contrastText: '#fff'
    },
    text: {
      primary: '#000',
      secondary: '#FFF',
      
    },
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
      
    },
    
    form: {
      textAlign: "center"
    },
    image: {
      margin: "10px auto 0px auto",
      height: 200
    },
    pageTitle: {
      margin: "10px auto 10px auto"
    },
    textField: {
      margin: "10px auto 10px auto",
      backgroundColor: '#CCCFD3'
    },
    button: {
      marginTop: 20,
      position: "relative"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 5
    },
    progress: {
      position: "absolute"
    },
    paper: {
      padding: 20,
      backgroundColor: '#262F50'
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    },
    paperActivity: {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    formPaper: {
      padding: '10vh 10vh',
      width: '50vh',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: '#262F50'
    },
    appBar: {
      marginBottom: 100,
      backgroundColor: '#262F50',
      maxHeight: '10vh'

    },
    numberField: {
      width: 70,
    },

  }
}