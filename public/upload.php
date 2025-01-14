<?php
// Путь для сохранения загруженных изображений
$uploadDir = 'uploads/';

// Проверяем, существует ли папка для загрузки, если нет — создаём
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Проверяем, был ли отправлен файл
if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $fileName = basename($_FILES['image']['name']);
    $uploadFilePath = $uploadDir . $fileName;

    // Проверяем, является ли файл изображением
    $imageInfo = getimagesize($_FILES['image']['tmp_name']);
    if ($imageInfo === false) {
        die(json_encode(['success' => false, 'error' => 'File is not an image.']));
    }

    // Перемещаем файл в папку uploads
    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFilePath)) {
        echo json_encode(['success' => true, 'imageUrl' => '/' . $uploadFilePath]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to upload file.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No file uploaded or error occurred.']);
}
?>