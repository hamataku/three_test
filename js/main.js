// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {
    let rot = 0; // 角度
    let mouseX = 0; // マウス座標
    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1000);

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera);
    // 滑らかにカメラコントローラーを制御する
    controls.enableDamping = true;
    controls.dampingFactor = 1;

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);
    // 平行光源2
    const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight2.position.set(0, 1, 1);
    // シーンに追加
    scene.add(directionalLight2);

    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('img/earthmap1k.jpg'),
        side: THREE.DoubleSide
    });

    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);

    // 形状とマテリアルからメッシュを作成します
    const earthMesh = new THREE.Mesh(geometry, material);
    // シーンにメッシュを追加します
    scene.add(earthMesh);

    // 星屑を作成します (カメラの動きをわかりやすくするため)
    createStarField();

    function createStarField() {
        // 形状データを作成
        const geometry = new THREE.Geometry();
        for (let i = 0; i < 1000; i++) {
            geometry.vertices.push(
                new THREE.Vector3(
                    3000 * (Math.random() - 0.5),
                    3000 * (Math.random() - 0.5),
                    3000 * (Math.random() - 0.5)
                )
            );
        }
        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xffffff
        });

        // 物体を作成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }



    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);

    function onResize() {
        // サイズを取得
        const width = window.innerWidth;
        const height = window.innerHeight;

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }


}