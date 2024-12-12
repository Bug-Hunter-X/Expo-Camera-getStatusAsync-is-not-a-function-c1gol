// bug.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';


export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; // or some loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // Calling getStatusAsync without checking status leads to the error
  // Camera.getStatusAsync();
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
            }}>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

// bugSolution.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [cameraStatus, setCameraStatus] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const getCameraStatus = async () => {
    const status = await Camera.getStatusAsync();
    setCameraStatus(status);
    console.log('Camera Status', status);
  };

  if (hasPermission === null) {
    return <View />; // or some loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} onCameraReady={getCameraStatus}>
        <View style={{flex:1}}></View>
      </Camera>
    </View>
  );
}