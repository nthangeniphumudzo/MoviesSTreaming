import { RestfulProvider } from 'restful-react';
import { BASE_API_URL } from 'app-constants';
import { AuthenticationProvider } from 'contexts/restful';
import { SigninProvider } from 'contexts/signin';

// import React from 'react';
// import App from 'next/app';
// import { CustomNProgress } from 'components';
// import { RestfulProvider } from 'restful-react';
// import { RouteProvider, AuthProvider, GlobalProvider } from 'providers';
// import { DesignContext } from 'contexts';
// import { defaultDesignContext } from 'contexts/designContext';

// interface IState {
//   headers: { [key: string]: string };
//   tokenIsSet: boolean;
// }

// export default class Main extends App<{}, {}, IState> {
//   static async getInitialProps({ Component, ctx }) {
//     const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
//     return { pageProps };
//   }

//   constructor(props) {
//     super(props);
//     this.state = {
//       headers: {},
//       tokenIsSet: false,
//     };
//   }

//   componentDidMount() {
//     this.setRequestHeaders();
//   }

//   componentWillReceiveProps() {
//     if (!this.state.tokenIsSet) {
//       this.setRequestHeaders(); // Try to update the the headers until you are successful
//     }
//   }

//   setRequestHeaders() {
//     import('utils/requestHeaders').then(({ requestHeaders }) => {
//       const headers = requestHeaders();

//       this.setState({ headers: requestHeaders(), tokenIsSet: !!headers.Authorization });
//     });
//   }

//   render() {
//     const { Component, pageProps } = this.props;

//     return (
//       //change port to your local from swagger

//       <RestfulProvider
//         base={'https://localhost:44309'}
//         requestOptions={{
//           headers: this.state.headers,
//         }}
//       >
//         <GlobalProvider>
//           <CustomNProgress />

//           <RouteProvider>
//             <AuthProvider>
//               <DesignContext.Provider value={defaultDesignContext}>
//                 <Component {...pageProps} />
//               </DesignContext.Provider>
//             </AuthProvider>
//           </RouteProvider>
//         </GlobalProvider>
//       </RestfulProvider>
//     );
//   }
// }

export default function App({ Component, pageProps }) {
  return (
    <RestfulProvider base={BASE_API_URL}>
      <SigninProvider>
        <AuthenticationProvider>
          <Component {...pageProps} />
        </AuthenticationProvider>
      </SigninProvider>
    </RestfulProvider>
  );
}
