import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AttendanceScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [students, setStudents] = useState([
    { id: '1', name: 'John Doe', checkedIn: false },
    { id: '2', name: 'Jane Smith', checkedIn: false },
    { id: '3', name: 'Robert Johnson', checkedIn: false },
    { id: '4', name: 'Emily Williams', checkedIn: false },
    { id: '5', name: 'Michael Brown', checkedIn: false },
  ]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    try {
      // Expecting data in format { id: '123' } or just '123'
      let studentId;
      try {
        const scannedData = JSON.parse(data);
        studentId = scannedData.id;
      } catch {
        studentId = data; // If not JSON, assume direct ID
      }
      
      // Find and update student
      setStudents(prevStudents => 
        prevStudents.map(student => 
          student.id === studentId 
            ? { ...student, checkedIn: true } 
            : student
        )
      );
      
      alert(`Student ID ${studentId} has been checked in!`);
    } catch (error) {
      alert(`Invalid QR code: ${error.message}`);
    }
    
    // Enable scanning again after 2 seconds
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  const renderItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentName}>{item.name}</Text>
      {item.checkedIn ? (
        <View style={styles.checkedInBadge}>
          <Text style={styles.checkedInText}>✓</Text>
        </View>
      ) : (
        <View style={styles.notCheckedInBadge}>
          <Text style={styles.notCheckedInText}>⦾</Text>
        </View>
      )}
    </View>
  );

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Attendance</Text>
      </View>
      
      <View style={styles.listContainer}>
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      </View>
      
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
          </View>
        </Camera>
        <View style={styles.scanInstructions}>
          <Text style={styles.scanText}>Scan student QR code</Text>
        </View>
      </View>
      
      {scanned && (
        <TouchableOpacity 
          style={styles.scanAgainButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    maxHeight: '30%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  list: {
    backgroundColor: '#fff',
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentName: {
    fontSize: 16,
  },
  checkedInBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedInText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notCheckedInBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notCheckedInText: {
    color: '#ccc',
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  scanInstructions: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanText: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 4,
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanAgainText: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    color: '#fff',
    fontSize: 16,
  },
});