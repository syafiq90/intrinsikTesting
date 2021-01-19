import {StyleSheet} from 'react-native';
import {Colors} from '../../themes/colors';

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContent: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContent: {
    flex: 2,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 36,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  logo: {
    width: 243,
    height: 80,
  },
  title: {
    color: '#1E2171',
    paddingLeft: 15,
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 25,
  },
  text: {
    color: '#5ec6c5',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  forgotPwdView: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  forgotPwdTxt: {
    color: '#5ec6c5',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#5ec6c5',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonDisable: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    marginTop: 50,
  },
  buttonDisableNoBorder: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textSignDisable: {
    color: Colors.mediumGray,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textSignUp: {
    color: '#5ec6c5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  slogan: {
    width: 110,
    height: 26,
    marginTop: 100,
    alignSelf: 'center',
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default styles;
