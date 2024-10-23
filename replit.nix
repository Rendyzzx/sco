{ pkgs }: {
    deps = [
        pkgs.gitlab-shell
         pkgs.iproute2
         pkgs.yarn
         pkgs.nodejs
        pkgs.nodePackages.typescript
        pkgs.imagemagick
        pkgs.jellyfin-ffmpeg
        pkgs.git
        pkgs.neofetch
        pkgs.libwebp
        pkgs.speedtest-cli
        pkgs.wget
        pkgs.yarn
        pkgs.libuuid
        pkgs.nodePackages.pm2 
    ];
    env = {
        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.libuuid
        ];
    };
}
