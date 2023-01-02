import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log(OrbitControls);

// グローバル変数の設定
let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", init);

function init() {
  // シーンの作成
  scene = new THREE.Scene();

  // カメラの追加
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, +500);

  //レンダラー
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 解像度が荒いときの対応
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // レンダー
  renderer.render(scene, camera);

  // テクスチャを追加
  let textures = new THREE.TextureLoader().load("./textures/earth.jpg");

  // ジオメトリを作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32);
  // マテリアルを作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures });
  // メッシュで組み合わせる
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  // 平行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ポイント光源を追加
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  // ポイント光源の場所を特定
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // マウス操作
  controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

// ブラウザのリサイズに対応
function onWindowResize() {
  // レンダラーのアスペクト比を随時更新
  renderer.setSize(window.innerWidth, window.innerHeight);
  // カメラのアスペクト比更新
  camera.aspect = window.innerWidth / window.innerHeight;
	// カメラのプロパティ更新
  camera.updateProjectionMatrix();
}

// ポイント光源、球のまわりを巡回
function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  // レンダリングしてみよう
  renderer.render(scene, camera);

  // フレーム単位で関数を呼び出す
  requestAnimationFrame(animate);
}
