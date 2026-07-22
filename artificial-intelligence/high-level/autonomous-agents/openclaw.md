### OpenClaw
* WARNING - doesn't work under root (sudo su), gotta run as regular user
* `curl -fsSL https://openclaw.ai/install.sh | bash`
  * Yes -> Yes -> More -> Custom Provider -> Once Crestodian appears, spam ctrl+c
* Start tunnel from your PC to VM: 
  * `ssh -N -L 18789:127.0.0.1:18789 -i D:\Programs\Programming\PuTTY\keys\ed25519\private-low-permissions hofls@44.231.45.124`
* Get token:
  * `cat ~/.openclaw/openclaw.json | grep token`
* Open http://localhost:18789/ from your PC and paste token
* Ask OpenClaw to do something, for example:
  * Install java, create and build sample project (gradle + spring boot)
  * Find any png image, download it, modify it (make it black and white)
* Workspace location:
  * `cd /home/hofls/.openclaw/workspace`
