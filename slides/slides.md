!SLIDE black
# Configuration Management with Puppet
## Paul Mucur, Application Development

!SLIDE blue
# What is configuration management?

!SLIDE green
# How do we currently configure servers for new applications?

!SLIDE red
# What is wrong with this approach?

!SLIDE blue
# What would be better?

!SLIDE green
# What are our options?

!SLIDE
# A Resource

    @@@ ruby
    user { 'henry':
      ensure     => present,
      uid        => '507',
      gid        => 'admin',
      shell      => '/bin/zsh',
      home       => '/home/henry',
      managehome => true,
    }

!SLIDE
# Applying a Manifest

    @@@ sh
    $ puppet apply henry.pp
    # notice: /Stage[main]//User[henry]/ensure: created

    $ puppet apply henry.pp

!SLIDE
# Correcting System State

    @@@ sh
    $ sudo chsh henry
    Changing shell for henry.
    New shell [/bin/zsh]: /bin/bash
    Shell changed.

    $ puppet apply henry.pp
    # notice: /Stage[main]//User[henry]/shell:
    # shell changed '/bin/bash' to '/bin/zsh'

!SLIDE
# The Trifecta

    @@@ ruby
    package { 'openssh-server':
      ensure => installed,
    }

    file { '/etc/sudoers':
      ensure => present,
      owner => 'root',
    }

    service { 'sshd':
      ensure => running,
    }

!SLIDE bullets green
# Typical Web Application

* Some dependent software (e.g. Ruby)
* User and directory structure
* Apache configuration

!SLIDE
# Software Dependencies and a User Account

    @@@ ruby
    package { 'ruby':
      ensure => installed,
    }

    user { 'myapp':
      ensure => present,
      home => '/home/myapp',
      managehome => true,
    }

!SLIDE
# Directory Structure

    @@@ ruby
    file { '/home/myapp/apps':
        ensure => directory,
        owner => 'myapp',
        group => 'myapp',
        require => User['myapp'],
    }

!SLIDE
# Apache Configuration

    @@@ ruby
    file {
      '/etc/httpd/available/myapp.conf':
        ensure => present,
        content => template('myapp.conf');

      '/etc/httpd/enabled/myapp.conf':
        ensure => link,
        target => '/etc/httpd/available/myapp.conf';
    }

!SLIDE blue
# The role of the Puppetmaster

!SLIDE red
# Testing your manifests

!SLIDE
# Virtual Machines & Vagrant

    @@@ ruby
    Vagrant::Config.run do |config|

      # Provision the Virtual Machine with Puppet.
      config.vm.provision :puppet
    end

!SLIDE
# Cucumber-Puppet

    @@@ cucumber
    Feature: General catalog policy
      In order to ensure applicability of a catalog
      As a manifest developer
      I want all catalogs to obey some general rules

      Scenario Outline: Compile and verify catalog
        Given a node specified by "features/test.yaml"
        When I compile its catalog
        Then compilation should succeed
        And all resource dependencies should resolve

        Examples:
          | hostname  |
          | localhost |

!SLIDE
# Nature Jobs

    @@@ ruby
    class { naturejobs:
      rails_env => 'production',
      passenger => true,
      solr      => true,
    }

!SLIDE bullets
# Further Information

* http://www.puppetlabs.com
* http://docs.puppetlabs.com/learning/
* https://github.com/nistude/cucumber-puppet
* http://www.vagrantup.com

